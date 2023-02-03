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

      <div className="">
        <div className="kanban-head">
          <strong className="kanban-head-title">CRM</strong>
        </div>
        <div className="ms-2 d-flex position-relative">
          <button type="button" class="btn btn-success me-5 ">
            <strong>Nuevo Negocio</strong>
          </button>
          <div className="texto">
            <table
              class="table table-bordered text-white position-absolute top-0 end-0"
              style={{
                width: 600,
              }}
            >
              <thead>
                <tr>
                  <th scope="col">En Calle= $20.054</th>
                  <th scope="col">Logrado= $15.024/75%</th>
                  <th scope="col">Negocios= 15</th>
                </tr>
              </thead>
            </table>
          </div>
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
          {/* columnas */}
          <div
            className="kanban-block tabla"
            // id="pendientes"
            ondrop="drop(event)"
            ondragover="allowDrop(event)"
          >
            <strong>Prospectos</strong>
          </div>

          <div
            className="kanban-block tabla"
            // id="procesos"
            ondrop="drop(event)"
            ondragover="allowDrop(event)"
          >
            <strong>Prospecto Calficado</strong>
          </div>

          <div
            className="kanban-block tabla"
            // id="completados"
            ondrop="drop(event)"
            ondragover="allowDrop(event)"
          >
            <strong>Contacto realizado</strong>
          </div>
          <div
            className="kanban-block tabla"
            // id="completados"
            ondrop="drop(event)"
            ondragover="allowDrop(event)"
          >
            <strong>Primera Cita</strong>
          </div>
          <div
            className="kanban-block tabla"
            // id="completados"
            ondrop="drop(event)"
            ondragover="allowDrop(event)"
          >
            <strong>Negociación Iniciada</strong>
          </div>
          <div
            className="kanban-block tabla"
            // id="compltaetados"
            ondrop="drop(event)"
            ondragover="allowDrop(event)"
          >
            <strong>Venta Concretada</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
