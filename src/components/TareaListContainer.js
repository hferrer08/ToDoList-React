// src/components/TareaListContainer.js
import React, { useEffect, useState } from "react";
import TareaList from "./TareaList";
import TareaModal from "./TareaModal";
import NoTareas from "./NoTareas";
import Spinner from "./Spinner";

const TareaListContainer = () => {
  const [tareas, setTareas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tareaAEditar, setTareaAEditar] = useState(null);

const [loadingTareas, setLoadingTareas] = useState(false);
const [loadingGuardar, setLoadingGuardar] = useState(false);

const fetchTareas = async () => {
  setLoadingTareas(true);// activar spinner
  try {
    
    const res = await fetch("https://tareasapi-vgud.onrender.com/api/tareas");
    const data = await res.json();

     // Ordenar: primero las no completadas
    const tareasOrdenadas = data.sort((a, b) => {
      return a.completada === b.completada ? 0 : a.completada ? 1 : -1;
    });

    setTareas(tareasOrdenadas);
  } catch (error) {
    console.error("Error al cargar tareas", error);
  } finally {
     setLoadingTareas(false); // desactivar spinner siempre
  }
};

  useEffect(() => {
    fetchTareas();
  }, []);

  const handleToggleCompletada = async (tareaActualizada) => {
    await fetch(
      `https://tareasapi-vgud.onrender.com/api/tareas/${tareaActualizada.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tareaActualizada),
      }
    );

    fetchTareas(); // Refresca la lista de tareas
  };

  const handleEliminarTarea = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar esta tarea?"
    );
    if (!confirmar) return;

    await fetch(`https://tareasapi-vgud.onrender.com/api/tareas/${id}`, {
      method: "DELETE",
    });

    fetchTareas(); // refresca la lista
  };

 const handleGuardarTarea = async (tarea) => {
 setLoadingGuardar(true);  // Activa spinner

  const url = tarea.id
    ? `https://tareasapi-vgud.onrender.com/api/tareas/${tarea.id}`
    : `https://tareasapi-vgud.onrender.com/api/tareas`;

  const metodo = tarea.id ? "PUT" : "POST";

  try {
    await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarea),
    });

    setShowModal(false);
    setTareaAEditar(null);
    await fetchTareas(); // refresca lista
  } catch (error) {
    console.error("Error guardando tarea", error);
    // Opcional: puedes mostrar una alerta o mensaje de error
  } finally {
    setLoadingGuardar(false); // Apaga spinner en cualquier caso
  }
};

  const handleEditarClick = (tarea) => {
    setTareaAEditar(tarea);
    setShowModal(true);
  };
 return (
  <div className="col-12 d-flex justify-content-center">
    <div className="col-12">
      <div className="row d-flex flex-row-reverse">
        <button
          type="button"
          className="btn btn-outline-secondary m-1 col-md-2"
          onClick={() => setShowModal(true)}
          disabled={loadingGuardar} // opcional, para evitar abrir modal mientras carga
        >
          Nueva Tarea
        </button>
      </div>

      {loadingTareas ? (
        <Spinner fullscreen />
      ) : tareas.length === 0 ? (
        <NoTareas />
      ) : (
        <TareaList
          tareas={tareas}
          onEditar={handleEditarClick}
          onEliminar={handleEliminarTarea}
          onToggleCompletada={handleToggleCompletada}
        />
      )}

      {showModal && (
        <TareaModal
          onClose={() => {
            setShowModal(false);
            setTareaAEditar(null);
          }}
          onGuardar={handleGuardarTarea}
          tareaEditada={tareaAEditar}
          loading={loadingGuardar}
        />
      )}
    </div>
  </div>
);

};

export default TareaListContainer;
