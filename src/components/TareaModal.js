import React, { useState, useEffect } from 'react';

function TareaModal({ onClose, onGuardar, tareaEditada = null }) {
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
    <div style={{
      backgroundColor: 'rgba(0,0,0,0.4)',
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '300px'
      }}>
        <h2>{tareaEditada ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <button onClick={handleGuardarClick} style={{ marginRight: '10px' }}>
          {tareaEditada ? 'Actualizar' : 'Guardar'}
        </button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

export default TareaModal;