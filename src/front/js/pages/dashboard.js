import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";

export const Dashboard = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="d-flex">
      {/* barra de menu */}

      <Navbar />

      <div className="container">
        <div className="kanban-head">
          <strong className="kanban-head-title">CRM</strong>
        </div>

        <div className="kanban-table">
          <div className="kanban-block kanban-form">
            <strong className="kanban-form-title">Tarea</strong>

            <div className="container-inputs">
              <strong className="strong-input">Nombre Tarea: </strong>
              <input type="text" id="tarea-nombre" className="input-text" />

              <strong className="strong-input">Descripción Tarea: </strong>
              <textarea
                type="text"
                id="tarea-descripcion"
                className="textarea-text"
                rows="4"
              ></textarea>

              <strong className="strong-input">Responsable Tarea: </strong>
              <input
                type="text"
                id="tarea-responsable"
                className="input-text"
              />
            </div>

            <input
              className="btn-crear"
              id="btn-crear-editar"
              type="submit"
              value="Crear Tarea"
              onclick="crearTarea(event)"
            />
          </div>

          <div
            className="kanban-block"
            id="pendientes"
            ondrop="drop(event)"
            ondragover="allowDrop(event)"
          >
            <strong>PENDIENTES</strong>
          </div>

          <div
            className="kanban-block"
            id="procesos"
            ondrop="drop(event)"
            ondragover="allowDrop(event)"
          >
            <strong>EN PROCESO</strong>
          </div>

          <div
            className="kanban-block"
            id="completados"
            ondrop="drop(event)"
            ondragover="allowDrop(event)"
          >
            <strong>COMPLETADOS</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
