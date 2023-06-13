import React, { useContext, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Context } from "../store/appContext";
import "../../styles/todo.css"
import { useParams } from "react-router-dom";
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

    const onDragEnd = (result) => {
        console.log(result);
        if (!result.destination) return;
        const { source, destination, draggableId } = result;
        console.log(source, destination, draggableId);
        if (source.droppableId !== destination.droppableId) {
        const sourceColIndex = store.tareas.findIndex(
            (e) => e.id === Number(draggableId)
        );
        console.log(sourceColIndex);
        const newList = [...store.tareas];
          console.log(newList);
        newList[sourceColIndex].estatus = destination.droppableId;
          console.log(newList[sourceColIndex].estatus, newList[sourceColIndex].id);
        actions.updateTaskStatus(newList);
          console.log(store.tareas);
        actions.putTareas({
            estatus:newList[sourceColIndex].estatus, 
            id:newList[sourceColIndex].id});
        }
    };
    let { theid } = useParams();

    return (
    
        <>
            <Navbar />
            {/* pagina */}
            <DragDropContext onDragEnd={onDragEnd}>
                <main 
                    className="" 
                    style={{ 
                            paddingLeft: "10rem",
                            paddingRight: "6rem"
                            }}>
                    <h1
                    className="text-white text-center mt-4 kanban-head-title"
                    >Tareas pendientes
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

                        <Droppable droppableId="por realizar">
                        {(droppableProvided) => (
                            <div className = "swim-lane"
                            {...droppableProvided.droppableProps}
                            ref={droppableProvided.innerRef}
                            >
                                <h3 className = "heading">POR HACER</h3>
                                {store.tareas.filter((tareasFiltradas) => tareasFiltradas.estatus === "por realizar")
                                .map((task, index) => (
                                <Draggable
                                key={task.id}
                                draggableId={String(task.id)}
                                index={index}
                            >
                                {(draggableProvided, snapshot) => (
                                    <div
                                    ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}
                                style={{
                                ...draggableProvided.draggableProps.style,
                                opacity: snapshot.isDragging ? "0.5" : "1",
                                }}
                                    >
                                    <p 
                                        className = {
                                                    `task ${dragOn == true ? "is-dragging" : ""} 
                                                    d-flex justify-content-between
                                                    `}  
                                        key = {index} 
                                        onDragStart = {(e) => setDragOn(true)} 
                                        onDragEnd = {(e) => setDragOn(false)}
                                        onDragOver = {(e) => {
                                                        e.preventDefault();
                                                    }}
                                        draggable = "true"
                                        >
                                        {task.tarea}

                                        <button 
                                            className="badge rounded-pill bg-danger"
                                            onClick={(e) => 
                                                actions.deleteTarea(task.id)
                                                }>
                                            <i 
                                            className='bx bx-trash fs-5'

                                            ></i>
                                        </button>
                                    </p>
                                </div>
                                )}
                                </Draggable>
                                ))}
                                {droppableProvided.placeholder}
                            </div>
                            )}
                            </Droppable>

                            <Droppable droppableId="en ejecución">
                        {(droppableProvided) => (
                            <div className="swim-lane"
                            {...droppableProvided.droppableProps}
                            ref={droppableProvided.innerRef}
                            >
                                <h3 className="heading">EN PROCESO</h3>
                                {store.tareas.filter((tareasFiltradas) => tareasFiltradas.estatus === "en ejecución")
                                    .map((task, index) => (
                                <Draggable
                                key={task.id}
                                draggableId={String(task.id)}
                                index={index}
                            >
                                {(draggableProvided, snapshot) => (
                                    <div
                                    ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}
                                style={{
                                ...draggableProvided.draggableProps.style,
                                opacity: snapshot.isDragging ? "0.5" : "1",
                                }}
                                >
                                    <p 
                                        className = {
                                                    `task ${dragOn == true ? "is-dragging" : ""} 
                                                    d-flex justify-content-between
                                                    `}  
                                        key = {index} 
                                        onDragStart = {(e) => setDragOn(true)} 
                                        onDragEnd = {(e) => setDragOn(false)}
                                        onDragOver = {(e) => {
                                                        e.preventDefault();
                                                    }}
                                        draggable = "true"
                                        >
                                        {task.tarea}

                                        <button 
                                            className="badge rounded-pill bg-danger"
                                            onClick={(e) => {
                                                actions.deleteTarea(task.id)}}>
                                            <i 
                                            className='bx bx-trash fs-5'
                                            ></i>
                                        </button>
                                    </p>
                                    </div>
                                        )}
                                </Draggable>
                                        ))}
                                        {droppableProvided.placeholder}
                                    </div>
                                    )}
                                </Droppable>

                                <Droppable droppableId="realizado">
                        {(droppableProvided) => (
                            <div className="swim-lane"
                            {...droppableProvided.droppableProps}
                            ref={droppableProvided.innerRef}
                            >
                                <h3 className="heading">REALIZADO</h3>
                                {store.tareas.filter((tareasFiltradas) => tareasFiltradas.estatus === "realizado")
                                    .map((task, index) => (
                                <Draggable
                                key={task.id}
                                draggableId={String(task.id)}
                                index={index}
                            >
                                {(draggableProvided, snapshot) => (
                                    <div
                                    ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}
                                style={{
                                ...draggableProvided.draggableProps.style,
                                opacity: snapshot.isDragging ? "0.5" : "1",
                                }}
                                >
                                    <p 
                                        className = {
                                                    `task ${dragOn == true ? "is-dragging" : ""} 
                                                    d-flex justify-content-between
                                                    `}  
                                        key = {index} 
                                        onDragStart = {(e) => setDragOn(true)} 
                                        onDragEnd = {(e) => setDragOn(false)}
                                        onDragOver = {(e) => {
                                                        e.preventDefault();
                                                    }}
                                        draggable = "true"
                                        >
                                        {task.tarea}

                                        <button 
                                            className="badge rounded-pill bg-danger"
                                            
                                            onClick={(e) => {
                                                actions.deleteTarea(task.id);
                                                }}>
                                            <i 
                                            className='bx bx-trash fs-5'
                                            ></i>
                                        </button>
                                    </p>
                                    </div>
                                        )}
                                </Draggable>
                                ))}
                                        {droppableProvided.placeholder}
                                </div>
                                )}
                                </Droppable>
                            </div>
                        
                    </div>
                </main>
            </DragDropContext>
        </>
        
        )
        
    }