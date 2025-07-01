// src/components/Tarea.js
import React, { useState } from "react";

const Tarea = ({ tarea, onEditar, onEliminar, onToggleCompletada }) => {
  const handleChange = (e) => {
    const nuevoEstado = e.target.checked;

    // Creamos la nueva tarea con el valor actualizado
    const tareaActualizada = {
      ...tarea,
      completada: nuevoEstado,
    };

    onToggleCompletada(tareaActualizada);
  };
  return (
    <li
      className={`list-group-item d-flex justify-content-between list-group-item-dark mb-2 ${
        tarea.completada ? "text-decoration-line-through" : ""
      }`}
    >
      <input
        style={{ marginRight: "10px" }}
        type="checkbox"
        checked={tarea.completada}
        onChange={handleChange}
        className="form-check-input me-2"
      />

      <label className="m-0">
        <strong>{tarea.nombre}</strong> - {tarea.descripcion}
      </label>
      
      
      <div>      
      <button
        className="btn-floating btn-small waves-effect waves-light m-1"
        onClick={() => onEditar(tarea)}
      >
        <i className="bi bi-pencil-square"></i>
      </button>
      <button
        className="btn-floating btn-small waves-effect waves-light red m-1"
        onClick={() => onEliminar(tarea.id)}
      >
        <i className="bi bi-trash"></i>
      </button>
      </div>
    </li>
  );
};

export default Tarea;

