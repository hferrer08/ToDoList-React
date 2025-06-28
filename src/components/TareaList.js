// src/components/TareaList.js
import React from 'react';
import Tarea from './Tarea';

const TareaList = ({ tareas }) => {
  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tareas.map((tarea) => (
          <Tarea key={tarea.id} tarea={tarea} />
        ))}
      </ul>
    </div>
  );
};

export default TareaList;