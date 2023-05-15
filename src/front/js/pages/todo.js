import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/todo.css"
import { Navbar } from "../component/navbar";

export function Todo() {
    const [task, setTask] = useState("");
    const { store, actions } = useContext(Context);
    const [dragOn, setDragOn] = useState(false)


    
    return (
        <div className="" style={{ height: "100vh" }}>
        {/* barra de menu */}
        <Navbar />
  
        {/* pagina */}
  
        <main className="" style={{ paddingLeft: "4rem" }}>
        <h1
          className="text-white text-center mt-5"
        >
          Tareas pendientes
        </h1>
        <div className="board">
            <form 
                id="todo-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    store.tasks.push(task)
                    setTask("");
                    console.log("entro aqui");
                  }} >
                <input 
                    type="text"
                    placeholder="Nueva tarea..."
                    value={task}
                    style={{fontWeight: "bold"}}
                    onChange={(e) => setTask(e.target.value)}
                    />
                <button
                    type="submit">
                        Agregar tarea +
                    </button>
            </form>
            <div className="lanes">
                <div className="swim-lane">
                    <h3 className="heading">POR HACER</h3>
                    {store.tasks.map((task, index) => 
                        <p 
                            className={`task ${dragOn == true ? "is-dragging" : ""}`}  
                            key={index} 
                            onDragStart= {(e) => setDragOn(true)} 
                            onDragEnd={(e) => setDragOn(false)}
                            draggable="true"
                            >
                            {task}
                        </p>
                     )}
                    <p className="task" draggable="true">Agendar cierre con Gerardo Perdomo</p>
                    <p className="task" draggable="true">pago de Adriana Vazquez</p>
                </div>

                <div className="swim-lane">
                    <h3 className="heading">EN PROCESO</h3>

                    <p className="task" draggable="true">llamar a Pedro Perez</p>
                    <p className="task" draggable="true">Agendar cierre con Gerardo Perdomo</p>
                    <p className="task" draggable="true">pago de Adriana Vazquez</p>
                </div>

                <div className="swim-lane">
                    <h3 className="heading">REALIZADO</h3>

                    <p className="task" draggable="true">llamar a Pedro Perez</p>
                    <p className="task" draggable="true">Agendar cierre con Gerardo Perdomo</p>
                    <p className="task" draggable="true">pago de Adriana Vazquez</p>
                </div>
            </div>
        </div>
          
        </main>
      </div>
    )
    
}