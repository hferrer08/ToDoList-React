// src/components/TareaListContainer.js
import React, { useEffect, useState } from 'react';
import TareaList from './TareaList';

const TareaListContainer = () => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetch('https://tareasapi-vgud.onrender.com/api/tareas')
      .then((response) => response.json())
      .then((data) => setTareas(data))
      .catch((error) => console.error('Error al obtener las tareas:', error));
  }, []);

  return <TareaList tareas={tareas} />;
};

export default TareaListContainer;
