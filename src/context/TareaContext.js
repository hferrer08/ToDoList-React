import { createContext, useState, useEffect } from 'react';
import { mostrarAlert, mostrarConfirmacion } from '../utils/Alerts';

export const TareaContext = createContext();

export const TareaProvider = ({ children }) => {
  const [tareas, setTareas] = useState([]);
  const [loadingTareas, setLoadingTareas] = useState(false);
  const [loadingGuardar, setLoadingGuardar] = useState(false);
  const [tareaAEditar, setTareaAEditar] = useState(null);
  const [mostrarSpinnerTareas, setMostrarSpinnerTareas] = useState(false);

const actualizarTareas = (nuevasTareas) => {
  const tareasOrdenadas = [...nuevasTareas].sort((a, b) =>
    a.completada === b.completada ? 0 : a.completada ? 1 : -1
  );
  setTareas(tareasOrdenadas);
  localStorage.setItem("tareas", JSON.stringify(tareasOrdenadas));
};

useEffect(() => {
  const tareasLocal = localStorage.getItem("tareas");
  if (tareasLocal) {
    setTareas(JSON.parse(tareasLocal));
  }

  fetchTareas(); // trae desde la API en segundo plano
}, []);

  let timeoutSpinner = null;
    //Traer datos de todas las tareas
   const fetchTareas = async () => {
    setLoadingTareas(true);

      // Mostrar el spinner solo si tarda más de 100ms
  timeoutSpinner = setTimeout(() => setMostrarSpinnerTareas(true), 100);

       try {
      const res = await fetch("https://tareasapi-vgud.onrender.com/api/tareas");
      const data = await res.json();
      const tareasOrdenadas = data.sort((a, b) =>
        a.completada === b.completada ? 0 : a.completada ? 1 : -1
      );
      actualizarTareas(tareasOrdenadas); // actualiza tanto estado como localStorage
    } catch (error) {
      console.error("Error al cargar tareas", error);
      mostrarAlert({
    icon: 'error',
    title: 'Error...',
    text: 'Ocurrió un error guardando la tarea.'
  });
    } finally {
      clearTimeout(timeoutSpinner); // Limpiar timeout si terminó antes
    setLoadingTareas(false);
    setMostrarSpinnerTareas(false); // Asegura ocultarlo si no se llegó al delay
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);
  //Actualizar estado tarea.completada // true or false
const handleToggleCompletada = async (tareaActualizada) => {
  // Actualiza en el estado local directamente
  const nuevasTareas = tareas.map(t =>
    t.id === tareaActualizada.id ? { ...t, completada: tareaActualizada.completada } : t
  );

  actualizarTareas(nuevasTareas); // actualiza tanto el state como localStorage

  // Luego sincroniza con la API en segundo plano
  try {
    await fetch(
      `https://tareasapi-vgud.onrender.com/api/tareas/${tareaActualizada.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tareaActualizada),
      }
    );
  } catch (error) {
    console.error("Error actualizando tarea", error);
    mostrarAlert({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar la tarea. Verifica tu conexión.",
    });
  }
};
//DELETE API
 const handleEliminarTarea = async (id) => {
  const confirmar = await mostrarConfirmacion({
    title: '¿Eliminar tarea?',
    text: 'Esta acción no se puede deshacer.',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });

  if (!confirmar) return;

  // Eliminar primero del estado local y localStorage
  const nuevasTareas = tareas.filter(t => t.id !== id);
  actualizarTareas(nuevasTareas);

  // Luego eliminar de la API en segundo plano
  try {
    await fetch(`https://tareasapi-vgud.onrender.com/api/tareas/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error al eliminar tarea", error);
    mostrarAlert({
      icon: "error",
      title: "Error",
      text: "No se pudo eliminar la tarea. Verifica tu conexión.",
    });
  }
};
  //Se usa para crear/editar tarea PUT o POST
 const handleGuardarTarea = async (tarea) => {
  setLoadingGuardar(true);

  const url = tarea.id
    ? `https://tareasapi-vgud.onrender.com/api/tareas/${tarea.id}`
    : `https://tareasapi-vgud.onrender.com/api/tareas`;

  const metodo = tarea.id ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarea),
    });

    if (!res.ok) {
      throw new Error("Error al guardar la tarea");
    }
    
     let tareaGuardada;

    if (metodo === "POST") {
      // Para POST esperamos la tarea creada con ID
      tareaGuardada = await res.json();
    } else {
      // Para PUT asumimos que la tarea editada es la misma que la enviada
      tareaGuardada = tarea;
    }

    let nuevasTareas;

    if (tarea.id) {
      // Edición: reemplazar la tarea en el array
      nuevasTareas = tareas.map(t =>
        t.id === tarea.id ? tareaGuardada : t
      );
    } else {
      // Nueva tarea: agregar al final (puedes usar unshift si prefieres al inicio)
      nuevasTareas = [...tareas, tareaGuardada];
    }

    actualizarTareas(nuevasTareas);
    setTareaAEditar(null);
    setShowModal(false); // cerrar modal si quieres
  } catch (error) {
    console.error("Error guardando tarea", error);
    mostrarAlert({
      icon: "error",
      title: "Error",
      text: "No se pudo guardar la tarea. Inténtalo más tarde.",
    });
  } finally {
    setLoadingGuardar(false);
  }
};

  const [showModal, setShowModal] = useState(false);

  return (
    <TareaContext.Provider
      value={{
        tareas,
        mostrarSpinnerTareas,
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