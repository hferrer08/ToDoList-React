// src/components/Tarea.js
import React from 'react';

const NoTareas = () => {
  return (
    <div className="mensajeVacio col-12">
            <ul className="list-group col-12">
                <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-dark">No tienes tareas pendientes.</li>   
            </ul>
            
        </div>
  );
};

export default NoTareas;