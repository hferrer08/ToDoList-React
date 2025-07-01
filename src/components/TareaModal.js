import React, { useState, useEffect } from 'react';
import './TareaModal.css';

function TareaModal({ onClose, onGuardar, tareaEditada = null}) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (tareaEditada) {
      setNombre(tareaEditada.nombre);
      setDescripcion(tareaEditada.descripcion);
    } else {
      setNombre('');
      setDescripcion('');
    }
  }, [tareaEditada]);

  const handleGuardarClick = () => {
    if (!nombre.trim() || !descripcion.trim()) {
      alert("Ambos campos son obligatorios");
      return;
    }

    const tarea = {
      ...tareaEditada, // si es nueva, no tiene id
      nombre,
      descripcion,
      completada: tareaEditada?.completada ?? false
    };

    onGuardar(tarea);
    setNombre('');
    setDescripcion('');
  };

 return (
  <div className="modal-overlay">
    <div className="modal-content-custom">
      <h4 className="mb-4 text-center">{tareaEditada ? 'Editar Tarea' : 'Nueva Tarea'}</h4>
      
      <div className="mb-3">
        <label htmlFor="nombreTarea" className="form-label">Nombre</label>
        <input
          id="nombreTarea"
          type="text"
          className="form-control"
          placeholder="Nombre de la tarea"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
           
        />
      </div>

      <div className="mb-4">
        <label htmlFor="descripcionTarea" className="form-label">Descripción</label>
        <textarea
          id="descripcionTarea"
          className="form-control"
          placeholder="Descripción de la tarea"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows="3"
           // deshabilitar si está cargando
        />
      </div>

      <div className="d-flex justify-content-end align-items-center">
       
        <button 
          onClick={handleGuardarClick} 
          className="btn btn-success me-2" 
          
        >
          {tareaEditada ? 'Actualizar' : 'Guardar'}
        </button>
        <button 
          onClick={onClose} 
          className="btn btn-secondary"
          
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
);
}

export default TareaModal;