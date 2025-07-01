import React from "react";
import TareaListContainer from "./components/TareaListContainer";

import "./App.css"; // o App.css

function App() {
  return (
    <div className="d-flex justify-content-center gradient-background">
      <div className="container col-8">
        <div className="container text-center titulo-container">
          <h1>Mi To Do List en React</h1>
          <p>
            Organiza tus tareas diarias con un diseño elegante y profesional.
          </p>
        </div>
        <div className="form-group row col-12 mt-4">
           <TareaListContainer />
         
        </div>
      </div>
     
    </div>
  );
}

export default App;
