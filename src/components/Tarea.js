// src/components/Tarea.js
import React from 'react';

const Tarea = ({ tarea, onEditar  }) => {
  return (
    <li>
      <strong>{tarea.nombre}</strong>: {tarea.descripcion} - {tarea.completada ? '✅' : '❌'}
       <button onClick={() => onEditar(tarea)}>Editar</button>
    </li>
  );
};

export default Tarea;