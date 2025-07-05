import React, { useState, useEffect } from 'react';
import './TareaModal.css';
import Spinner from './Spinner';

function TareaModal({ onClose, onGuardar, tareaEditada = null, loading}) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [completada, setCompletada] = useState(false);

  useEffect(() => {
    if (tareaEditada) {
      setNombre(tareaEditada.nombre);
      setDescripcion(tareaEditada.descripcion);
      setCompletada(tareaEditada.completada);
    } else {
      setNombre('');
      setDescripcion('');
      setCompletada(false);
    }
  }, [tareaEditada]);

  const handleGuardarClick = () => {
    if (!nombre.trim()) {
      alert("El nombre de tarea es obligatorio.");
      return;
    }

    const tarea = {
      ...tareaEditada, // si es nueva, no tiene id
      nombre,
      descripcion,
      completada
    };

    onGuardar(tarea);
    setNombre('');
    setDescripcion('');
    setCompletada(false);
  };

 return (
  <div className="custom-modal-overlay">
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
           disabled={loading}
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
          rows="6"
          disabled={loading}
           
        />
      </div>

      <div className="form-check mb-4">
  <input
    className="form-check-input"
    type="checkbox"
    id="completadaCheckbox"
    checked={completada}
    onChange={(e) => setCompletada(e.target.checked)}
    disabled={loading}
  />
  <label className="form-check-label" htmlFor="completadaCheckbox">
    Tarea completada
  </label>
</div>

      {loading && (
          <div className="text-center my-3">
            <Spinner />
          </div>
        )}

      <div className="d-flex justify-content-end align-items-center">
       
        <button 
          onClick={handleGuardarClick} 
          className="btn btn-success me-2" 
          disabled={loading}
        >
        {loading ? 'Guardando...' : tareaEditada ? 'Actualizar' : 'Guardar'}
        </button>
        <button 
          onClick={onClose} 
          className="btn btn-secondary"
           disabled={loading}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
);
}

export default TareaModal;