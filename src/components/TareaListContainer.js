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

  const [loading, setLoading] = useState(false);

  const fetchTareas = async () => {
    setLoading(true); // ← activa el spinner
    try {
      const res = await fetch("https://tareasapi-vgud.onrender.com/api/tareas");
      const data = await res.json();
      setTareas(data);
    } catch (error) {
      console.error("Error al cargar tareas", error);
    }
    setLoading(false); // ← desactiva el spinner
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
    const url = tarea.id
      ? `https://tareasapi-vgud.onrender.com/api/tareas/${tarea.id}`
      : `https://tareasapi-vgud.onrender.com/api/tareas`;

    const metodo = tarea.id ? "PUT" : "POST";

    await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarea),
    });

    setShowModal(false);
    setTareaAEditar(null);
    fetchTareas(); // refresca lista
  };

  const handleEditarClick = (tarea) => {
    setTareaAEditar(tarea);
    setShowModal(true);
  };
 return (
  <div className="col-12 d-flex justify-content-center">
    <div className="col-12">
      <button
        type="button"
        className="btn btn-outline-secondary m-1"
        onClick={() => setShowModal(true)}
      >
        Nueva Tarea
      </button>

      {loading ? (
       <Spinner /> 
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
        />
      )}
    </div>
  </div>
);
};

export default TareaListContainer;
