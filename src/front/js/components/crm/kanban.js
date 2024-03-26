import React, { useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import "../../../styles/dashboard.css";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
import { TarjetaCliente } from "./tarjetaCliente";

export const Kanban = () => {
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
      newList[sourceColIndex].status = destination.droppableId;
      theid = newList[sourceColIndex].id;
      // console.log(newList[sourceColIndex].status, newList[sourceColIndex].id);
      actions.updateClientStatus(newList);
      // console.log(store.clientes);
      actions.putCliente({
        status: newList[sourceColIndex].status,
        cliente_id: theid,
      });
      actions.closedArray();
      actions.amountSumClosed();
    }
  };

  // const Element = Scroll.Element;

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-table">
          {/* columnas */}
          <Droppable droppableId="Prospecto">
            {(droppableProvided) => (
              <div
                className="kanban-block swim-lane"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-white">
                  PROSPECTOS{" "}
                  <span style={{ background: "black" }} className="badge">
                    {
                      store.clientes.filter(
                        (cliente) => cliente.status === "Prospecto"
                      ).length
                    }
                  </span>
                </strong>
                <scroll-container>
                  {store.clientes
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
                            <TarjetaCliente cliente={cliente}>
                              {cliente.name}
                              <br></br>
                              {actions.calcularEdad(cliente.birthdate) +
                                " años"}
                              <br></br>${cliente.amount}
                              <br></br>
                              Confianza {cliente.trust}
                            </TarjetaCliente>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </scroll-container>

                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="Contactado">
            {(droppableProvided) => (
              <div
                className="kanban-block swim-lane"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-white">
                  CONTACTADOS{" "}
                  <span style={{ background: "black" }} className="badge">
                    {
                      store.clientes.filter(
                        (cliente) => cliente.status === "Contactado"
                      ).length
                    }
                  </span>
                </strong>
                <scroll-container>
                  {store.clientes
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
                            <TarjetaCliente cliente={cliente}>
                              {cliente.name}
                              <br></br>
                              {actions.calcularEdad(cliente.birthdate) +
                                " años"}
                              <br></br>${cliente.amount}
                              <br></br>
                              Confianza {cliente.trust}
                            </TarjetaCliente>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </scroll-container>
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Primera Cita">
            {(droppableProvided) => (
              <div
                className="kanban-block swim-lane"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-white">
                  PRIMERA CITA{" "}
                  <span style={{ background: "black" }} className="badge">
                    {
                      store.clientes.filter(
                        (cliente) => cliente.status === "Primera Cita"
                      ).length
                    }
                  </span>
                </strong>
                <scroll-container>
                  {store.clientes
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
                            <TarjetaCliente cliente={cliente}>
                              {cliente.name}
                              <br></br>
                              {actions.calcularEdad(cliente.birthdate) +
                                " años"}
                              <br></br>${cliente.amount}
                              <br></br>
                              Confianza {cliente.trust}
                            </TarjetaCliente>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </scroll-container>
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Negociación">
            {(droppableProvided) => (
              <div
                className="kanban-block swim-lane"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-white">
                  NEGOCIACIÓN{" "}
                  <span style={{ background: "black" }} className="badge">
                    {
                      store.clientes.filter(
                        (cliente) => cliente.status === "Negociación"
                      ).length
                    }
                  </span>
                </strong>
                <scroll-container>
                  {store.clientes
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
                            <TarjetaCliente cliente={cliente}>
                              {cliente.name}
                              <br></br>
                              {actions.calcularEdad(cliente.birthdate) +
                                " años"}
                              <br></br>${cliente.amount}
                              <br></br>
                              Confianza {cliente.trust}
                            </TarjetaCliente>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </scroll-container>
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Cerrado">
            {(droppableProvided) => (
              <div
                className="kanban-block swim-lane"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-white">
                  CIERRES{" "}
                  <span style={{ background: "black" }} className="badge">
                    {
                      store.clientes.filter(
                        (cliente) => cliente.status === "Cerrado"
                      ).length
                    }
                  </span>
                </strong>
                <scroll-container>
                  {store.clientes
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
                            <TarjetaCliente cliente={cliente}>
                              {cliente.name}
                              <br></br>
                              {actions.calcularEdad(cliente.birthdate) +
                                " años"}
                              <br></br>${cliente.amount}
                              <br></br>
                              Confianza {cliente.trust}
                            </TarjetaCliente>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </scroll-container>
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};
