import React, { useEffect, useState, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import "../../styles/dashboard.css";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { TarjetaClienteManager } from "./tarjetaClienteManager";

export const KanbanAsociado = () => {
  const { store, actions } = useContext(Context);
  let { theid } = useParams();

  const onDragEnd = (result) => {
    // console.log(result);
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = store.clientes.findIndex(
        (e) => e.id === Number(draggableId)
      );
      // console.log(sourceColIndex);
      const newList = [...store.clientes];
      // console.log(newList);
      newList[sourceColIndex].estatus = destination.droppableId;
      theid = newList[sourceColIndex].id;
      // console.log(newList[sourceColIndex].estatus, newList[sourceColIndex].id);
      actions.updateClientStatus(newList);
      // console.log(store.clientes);
      actions.putCliente({
        estatus: newList[sourceColIndex].estatus,
        cliente_id: theid,
      });
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-table" style={{ marginTop: "0" }}>
          {/* columnas */}
          <Droppable droppableId="Prospecto">
            {(droppableProvided) => (
              <div
                className="kanban-block tabla"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-primary">
                  PROSPECTOS{" "}
                  <span
                    style={{ background: "rgb(50,110,253)" }}
                    className="badge"
                  >
                    {
                      store.userClients.filter(
                        (cliente) => cliente.status === "Prospecto"
                      ).length
                    }
                  </span>
                </strong>

                {store.userClients
                  .filter((cliente) => cliente.status === "Prospecto")
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
                          <TarjetaClienteManager cliente={cliente}>
                            {cliente.name}
                            <br></br>
                            {actions.calcularEdad(cliente.birthdate) + " años"}
                            <br></br>${cliente.amount}
                            <br></br>
                            Confianza {cliente.trust}
                          </TarjetaClienteManager>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="Contactado">
            {(droppableProvided) => (
              <div
                className="kanban-block tabla"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-primary">
                  CONTACTADOS{" "}
                  <span
                    style={{ background: "rgb(50,110,253)" }}
                    className="badge"
                  >
                    {
                      store.userClients.filter(
                        (cliente) => cliente.status === "Contactado"
                      ).length
                    }
                  </span>
                </strong>

                {store.userClients
                  .filter((cliente) => cliente.status === "Contactado")
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
                          <TarjetaClienteManager cliente={cliente}>
                            {cliente.name}
                            <br></br>
                            {actions.calcularEdad(cliente.birthdate) + " años"}
                            <br></br>${cliente.amount}
                            <br></br>
                            Confianza {cliente.trust}
                          </TarjetaClienteManager>
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
                  PRIMERA CITA{" "}
                  <span
                    style={{ background: "rgb(50,110,253)" }}
                    className="badge"
                  >
                    {
                      store.userClients.filter(
                        (cliente) => cliente.status === "Primera Cita"
                      ).length
                    }
                  </span>
                </strong>

                {store.userClients
                  .filter((cliente) => cliente.status === "Primera Cita")
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
                          <TarjetaClienteManager cliente={cliente}>
                            {cliente.name}
                            <br></br>
                            {actions.calcularEdad(cliente.birthdate) + " años"}
                            <br></br>${cliente.amount}
                            <br></br>
                            Confianza {cliente.trust}
                          </TarjetaClienteManager>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Negociación">
            {(droppableProvided) => (
              <div
                className="kanban-block tabla"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-primary">
                  NEGOCIACIÓN{" "}
                  <span
                    style={{ background: "rgb(50,110,253)" }}
                    className="badge"
                  >
                    {
                      store.userClients.filter(
                        (cliente) => cliente.status === "Negociación"
                      ).length
                    }
                  </span>
                </strong>

                {store.userClients
                  .filter((cliente) => cliente.status === "Negociación")
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
                          <TarjetaClienteManager cliente={cliente}>
                            {cliente.name}
                            <br></br>
                            {actions.calcularEdad(cliente.birthdate) + " años"}
                            <br></br>${cliente.amount}
                            <br></br>
                            Confianza {cliente.trust}
                          </TarjetaClienteManager>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Cerrado">
            {(droppableProvided) => (
              <div
                className="kanban-block tabla"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-primary">
                  CIERRES{" "}
                  <span
                    style={{ background: "rgb(50,110,253)" }}
                    className="badge"
                  >
                    {
                      store.userClients.filter(
                        (cliente) => cliente.status === "Cerrado"
                      ).length
                    }
                  </span>{" "}
                </strong>

                {store.userClients
                  .filter((cliente) => cliente.status === "Cerrado")
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
                          <TarjetaClienteManager cliente={cliente}>
                            {cliente.name}
                            <br></br>
                            {actions.calcularEdad(cliente.birthdate) + " años"}
                            <br></br>${cliente.amount}
                            <br></br>
                            Confianza {cliente.trust}
                          </TarjetaClienteManager>
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
