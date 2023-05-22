import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/todo.css"
import { Navbar } from "../component/navbar";

export function Todo() {
    const [task, setTask] = useState("");
    const { store, actions } = useContext(Context);
    const [dragOn, setDragOn] = useState(false)
    useEffect(() => {
        if (store.token && store.token !== "" && store.token !== undefined) {
          actions.getTareas();
        }
      }, [store.token]);

    let estatus = "por realizar" 

    return (
        <div 
            className="" 
            style={{ 
                    height: "100vh" 
                    }}>
        {/* barra de menu */}
        <Navbar />
  
        {/* pagina */}
  
        <main 
            className="" 
            style={{ 
                    paddingLeft: "10rem",
                    paddingRight: "6rem"
                    }}>
        <h1
          className="text-white text-center mt-4 kanban-head-title"
        >
          Tareas pendientes
        </h1>
        <div className="board">
            <form 
                id="todo-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    actions.postTareas({
                        tarea: task,
                        estatus:estatus
                    })
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
            <div className = "lanes">
                <div className = "swim-lane">
                    <h3 className = "heading">POR HACER</h3>
                    {store.tareas.map((task, index) => 
                        <p 
                            className = {`task ${dragOn == true ? "is-dragging" : ""}`}  
                            key = {index} 
                            onDragStart = {(e) => setDragOn(true)} 
                            onDragEnd = {(e) => setDragOn(false)}
                            onDragOver = {(e) => {
                                            e.preventDefault();
                                        }}
                            draggable = "true"
                            >
                            {task.tarea}
                        </p>
                     )}
                    
                </div>

                <div className="swim-lane">
                    <h3 className="heading">EN PROCESO</h3>

                </div>

                <div className="swim-lane">
                    <h3 className="heading">REALIZADO</h3>

                </div>
            </div>
        </div>
          
        </main>
      </div>
    )
    
}