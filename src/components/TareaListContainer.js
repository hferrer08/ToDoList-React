// src/components/TareaListContainer.js
import React, { useEffect, useState, useContext } from "react";
import { TareaContext } from "../context/TareaContext";
import TareaList from "./TareaList";
import TareaModal from "./TareaModal";
import NoTareas from "./NoTareas";
import Spinner from "./Spinner";

const TareaListContainer = () => {
  
const {
    tareas,
    loadingTareas,
    loadingGuardar,
    tareaAEditar,
     showModal,
  setShowModal,
    setTareaAEditar,
    handleEliminarTarea,
    handleGuardarTarea,
    handleToggleCompletada,
  } = useContext(TareaContext);

    const handleEditarClick = (tarea) => {
    setTareaAEditar(tarea);
    setShowModal(true);
  };

 return (
  <div className="col-12 d-flex justify-content-center">
    <div className="col-12">
      <div className="row d-flex flex-row-reverse">
        <button
          type="button"
          className="btn btn-outline-secondary m-1 col-md-2"
          onClick={() => {
          setTareaAEditar(null);
          setShowModal(true);
          }}
          disabled={loadingGuardar} // opcional, para evitar abrir modal mientras carga
        >
          Nueva Tarea
        </button>
      </div>

      {loadingTareas ? (
        <Spinner fullscreen />
      ) : tareas.length === 0 ? (
        <NoTareas />
      ) : (
        <TareaList
          tareas={tareas}
          onEditar={handleEditarClick}
          onEliminar={handleEliminarTarea}
          onToggleCompletada={handleToggleCompletada}
        />
      )}

      {showModal && <TareaModal />}
    </div>
  </div>
);

};

export default TareaListContainer;
