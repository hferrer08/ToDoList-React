// src/components/TareaList.js
import React from 'react';
import Tarea from './Tarea';

const TareaList = ({ tareas, onEditar }) => {
  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tareas.map((tarea) => (
          <Tarea key={tarea.id} tarea={tarea} onEditar={onEditar} />
        ))}
      </ul>
    </div>
  );
};

export default TareaList;