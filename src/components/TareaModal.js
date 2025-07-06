import React, { useState, useEffect, useContext } from 'react';
import './TareaModal.css';
import Spinner from './Spinner';
import { TareaContext } from '../context/TareaContext';
import { mostrarAlert } from '../utils/Alerts';

function TareaModal() {
  
   const {
    tareaAEditar,
    handleGuardarTarea,
    loadingGuardar,
     setShowModal,
     setTareaAEditar,
  } = useContext(TareaContext);
  
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [completada, setCompletada] = useState(false);

  useEffect(() => {
    if (tareaAEditar) {
      setNombre(tareaAEditar.nombre);
      setDescripcion(tareaAEditar.descripcion);
      setCompletada(tareaAEditar.completada);
    } else {
      setNombre('');
      setDescripcion('');
      setCompletada(false);
    }
  }, [tareaAEditar]);

  const handleGuardarClick = () => {
     if (!nombre.trim()) {
    mostrarAlert({
      icon: 'warning',
      title: 'Campo obligatorio',
      text: 'El nombre de la tarea es requerido.'
    });
    return;
  }

   if (nombre.length > 100 || descripcion.length > 100) {
    mostrarAlert({
      icon: 'warning',
      title: 'Texto muy largo',
      text: 'El nombre o descripción de la tarea no puede superar los 100 caracteres.'
    });
    return;
  }

    const tarea = {
      ...tareaAEditar, // si es nueva, no tiene id
      nombre,
      descripcion,
      completada
    };

    handleGuardarTarea(tarea);
    setNombre('');
    setDescripcion('');
    setCompletada(false);
  };

 return (
  <div className="custom-modal-overlay">
    <div className="modal-content-custom">
      <h4 className="mb-4 text-center">{tareaAEditar ? 'Editar Tarea' : 'Nueva Tarea'}</h4>
      
      <div className="mb-3">
        <label htmlFor="nombreTarea" className="form-label">Nombre</label>
        <input
          id="nombreTarea"
          type="text"
          className="form-control"
          placeholder="Nombre de la tarea"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
           disabled={loadingGuardar}
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
          disabled={loadingGuardar}
           
        />
      </div>

      <div className="form-check mb-4">
  <input
    className="form-check-input"
    type="checkbox"
    id="completadaCheckbox"
    checked={completada}
    onChange={(e) => setCompletada(e.target.checked)}
    disabled={loadingGuardar}
  />
  <label className="form-check-label" htmlFor="completadaCheckbox">
    Tarea completada
  </label>
</div>

      {loadingGuardar && (
          <div className="text-center my-3">
            <Spinner />
          </div>
        )}

      <div className="d-flex justify-content-end align-items-center">
       
        <button 
          onClick={() => {
              handleGuardarClick();
              setShowModal(false);
              setTareaAEditar(null);
          }}
            
            
          className="btn btn-success me-2" 
          disabled={loadingGuardar}
        >
        {loadingGuardar ? 'Guardando...' : tareaAEditar ? 'Actualizar' : 'Guardar'}
        </button>
        <button 
          onClick={() => {
    setShowModal(false);
    
      }} 
          className="btn btn-secondary"
           disabled={loadingGuardar}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
);
}

export default TareaModal;