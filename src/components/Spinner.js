import React from 'react';

const Spinner = ({ fullscreen = false }) => {
  const spinner = (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: '3rem', height: '3rem' }}
      >
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
       
          zIndex: 10000, // asegurar encima de modales y otros elementos
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {spinner}
      </div>
    );
  }

  return <div className="my-4">{spinner}</div>;
};

export default Spinner;