// src/components/Tarea.js
import React from 'react';

const Tarea = ({ tarea }) => {
  return (
    <li>
      <strong>{tarea.nombre}</strong>: {tarea.descripcion} - {tarea.completada ? '✅' : '❌'}
    </li>
  );
};

export default Tarea;