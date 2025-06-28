// src/components/TareaListContainer.js
import React, { useEffect, useState } from 'react';
import TareaList from './TareaList';
import TareaModal from './TareaModal';




const TareaListContainer = () => {
  const [tareas, setTareas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tareaAEditar, setTareaAEditar] = useState(null);

 const fetchTareas = async () => {
    const res = await fetch('https://tareasapi-vgud.onrender.com/api/tareas');
    const data = await res.json();
    setTareas(data);
  };

   useEffect(() => {
    fetchTareas();
  }, []);

  const handleGuardarTarea = async (tarea) => {
    const url = tarea.id
      ? `https://tareasapi-vgud.onrender.com/api/tareas/${tarea.id}`
      : `https://tareasapi-vgud.onrender.com/api/tareas`;

    const metodo = tarea.id ? 'PUT' : 'POST';

    await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tarea)
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
    <div>
      <h1>Lista de Tareas</h1>

       <button onClick={() => setShowModal(true)}>Nueva Tarea</button>
      <TareaList tareas={tareas} />
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
  );
};

export default TareaListContainer;
