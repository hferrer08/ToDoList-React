// src/components/TareaList.js
import React from 'react';
import Tarea from './Tarea';

const TareaList = ({ tareas, onEditar, onEliminar, onToggleCompletada }) => {
  return (
    <div className='li-container col-12'>
     
      <ul className='list-group col-12'>
        {tareas.map((tarea) => (
          <Tarea key={tarea.id} tarea={tarea} onEditar={onEditar} onEliminar={onEliminar} onToggleCompletada={onToggleCompletada} />
        ))}
      </ul>
    </div>
  );
};

export default TareaList;