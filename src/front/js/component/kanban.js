import React, { useEffect, useState, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import "../../styles/dashboard.css";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Tarjetacliente } from "./tarjetaCliente";

export const Kanban = () => {
  const { store, actions } = useContext(Context);
  let { theid } = useParams();

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = store.clientes.findIndex(
        (e) => e.id === Number(draggableId)
      );
      console.log(sourceColIndex);
      const newList = [...store.clientes];
      console.log(newList);
      newList[sourceColIndex].estatus = destination.droppableId;
      theid = newList[sourceColIndex].id
      console.log(newList[sourceColIndex].estatus, newList[sourceColIndex].id);
      actions.updateClientStatus(newList);
      console.log(store.clientes);
      actions.putCliente({
        estatus:newList[sourceColIndex].estatus, 
        cliente_id:theid});
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-table">
          {/* columnas */}
          <Droppable droppableId="Prospecto">
            {(droppableProvided) => (
              <div
                className="kanban-block tabla"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-primary">
                  PROSPECTOS
                </strong>

                {store.clientes
                  .filter((cliente) => cliente.estatus === "Prospecto")
                    .map((cliente, index) => (
                  <Draggable
                    key={cliente.id}
                    draggableId={String(cliente.id)}
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
                        <Tarjetacliente>
                          {cliente.nombre}
                          <br></br>
                          {cliente.fecha}
                          <br></br>${cliente.monto}
                          <br></br>
                          Confianza {cliente.confianza}
                        </Tarjetacliente>
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>

          {/* --------------------------CODIGO ORIGINAL----------------------------- */}
          {/* {store.clientes
                  .filter((cliente) => cliente.estatus === "Prospecto")
                  .map((cliente, index) => (
                    <Draggable
                      key={cliente.id}
                      draggableId={String(cliente.id)}
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
                          <Tarjetacliente>
                            {cliente.nombre}
                            <br></br>
                            {cliente.fecha}
                            <br></br>${cliente.monto}
                            <br></br>
                            Confianza {cliente.confianza}
                          </Tarjetacliente>
                        </div>
                      )}
                    </Draggable>
                  ))} */}

          <Droppable droppableId="Contacto realizado">
            {(droppableProvided) => (
              <div
                className="kanban-block tabla"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-primary">
                  CONTACTADOS
                </strong>

                {store.clientes
                  .filter((cliente) => cliente.estatus === "Contacto realizado")
                  .map((cliente, index) => (
                    <Draggable
                      key={cliente.id}
                      draggableId={String(cliente.id)}
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
                          <Tarjetacliente>
                            {cliente.nombre}
                            <br></br>
                            {cliente.fecha}
                            <br></br>${cliente.monto}
                            <br></br>
                            Confianza {cliente.confianza}
                          </Tarjetacliente>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Primera Cita">
            {(droppableProvided) => (
              <div
                className="kanban-block tabla"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-primary">
                  PRIMERA CITA
                </strong>

                {store.clientes
                  .filter((cliente) => cliente.estatus === "Primera Cita")
                  .map((cliente, index) => (
                    <Draggable
                      key={cliente.id}
                      draggableId={String(cliente.id)}
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
                          <Tarjetacliente>
                            {cliente.nombre}
                            <br></br>
                            {cliente.fecha}
                            <br></br>${cliente.monto}
                            <br></br>
                            Confianza {cliente.confianza}
                          </Tarjetacliente>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Negociación Iniciada">
            {(droppableProvided) => (
              <div
                className="kanban-block tabla"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-primary">
                  NEGOCIACIÓN
                </strong>

                {store.clientes
                  .filter(
                    (cliente) => cliente.estatus === "Negociación Iniciada"
                  )
                  .map((cliente, index) => (
                    <Draggable
                      key={cliente.id}
                      draggableId={String(cliente.id)}
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
                          <Tarjetacliente>
                            {cliente.nombre}
                            <br></br>
                            {cliente.fecha}
                            <br></br>${cliente.monto}
                            <br></br>
                            Confianza {cliente.confianza}
                          </Tarjetacliente>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Venta Concretada">
            {(droppableProvided) => (
              <div
                className="kanban-block tabla"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-primary">CIERRES</strong>

                {store.clientes
                  .filter((cliente) => cliente.estatus === "Venta Concretada")
                  .map((cliente, index) => (
                    <Draggable
                      key={cliente.id}
                      draggableId={String(cliente.id)}
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
                          <Tarjetacliente>
                            {cliente.nombre}
                            <br></br>
                            {cliente.fecha}
                            <br></br>${cliente.monto}
                            <br></br>
                            Confianza {cliente.confianza}
                          </Tarjetacliente>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};
