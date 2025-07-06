import { createContext, useState, useEffect } from 'react';
import { mostrarAlert, mostrarConfirmacion } from '../utils/Alerts';

export const TareaContext = createContext();

export const TareaProvider = ({ children }) => {
  const [tareas, setTareas] = useState([]);
  const [loadingTareas, setLoadingTareas] = useState(false);
  const [loadingGuardar, setLoadingGuardar] = useState(false);
  const [tareaAEditar, setTareaAEditar] = useState(null);
    //Traer datos de todas las tareas
   const fetchTareas = async () => {
    setLoadingTareas(true);
    try {
      const res = await fetch("https://tareasapi-vgud.onrender.com/api/tareas");
      const data = await res.json();
      const tareasOrdenadas = data.sort((a, b) =>
        a.completada === b.completada ? 0 : a.completada ? 1 : -1
      );
      setTareas(tareasOrdenadas);
    } catch (error) {
      console.error("Error al cargar tareas", error);
      mostrarAlert({
    icon: 'error',
    title: 'Error...',
    text: 'Ocurrió un error guardando la tarea.'
  });
    } finally {
      setLoadingTareas(false);
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);
  //Actualizar estado tarea.completada // true or false
const handleToggleCompletada = async (tareaActualizada) => {
    await fetch(
      `https://tareasapi-vgud.onrender.com/api/tareas/${tareaActualizada.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tareaActualizada),
      }
    );
    fetchTareas();
  };
  //DELETE a una tarea
  const handleEliminarTarea = async (id) => {
    
    const confirmar = await mostrarConfirmacion({
    title: '¿Eliminar tarea?',
    text: 'Esta acción no se puede deshacer.',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });

    if (!confirmar) return;

    await fetch(`https://tareasapi-vgud.onrender.com/api/tareas/${id}`, {
      method: "DELETE",
    });

    fetchTareas();
  };
  //Se usa para crear/editar tarea PUT o POST
  const handleGuardarTarea = async (tarea) => {
    setLoadingGuardar(true);

    const url = tarea.id
      ? `https://tareasapi-vgud.onrender.com/api/tareas/${tarea.id}`
      : `https://tareasapi-vgud.onrender.com/api/tareas`;

    const metodo = tarea.id ? "PUT" : "POST";

    try {
      await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarea),
      });
      setTareaAEditar(null);
      fetchTareas();
    } catch (error) {
      console.error("Error guardando tarea", error);
    } finally {
      setLoadingGuardar(false);
    }
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <TareaContext.Provider
      value={{
        tareas,
        loadingTareas,
        loadingGuardar,
        tareaAEditar,
        showModal,
        setShowModal,
        setTareaAEditar,
        fetchTareas,
        handleToggleCompletada,
        handleEliminarTarea,
        handleGuardarTarea,
      }}
    >
      {children}
    </TareaContext.Provider>
  );
};