import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Nuevonegocio } from "../component/nuevoNegocio";
import { Tarjetacliente } from "../component/tarjetaCliente";

export const Dashboard = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getClientes();
  }, []);

  return (
    <div className="d-flex">
      {/* barra de menu */}

      <Navbar />

      <div className="">
        <div className="kanban-head">
          <strong className="kanban-head-title">CRM</strong>
        </div>
        <div className="ms-2 d-flex position-relative mb-3">
          <Nuevonegocio />;
          <div className="texto text-center">
            <table
              className="table table-bordered text-white position-absolute top-0 end-0"
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
          {/* columnas */}
          <div
            className="kanban-block tabla"
            // id="pendientes"
            onDrop="drop(event)"
            onDragOver="allowDrop(event)"
          >
            <strong>Prospectos</strong>
            {store.clientes.map((cliente, index) => {
              return <Tarjetacliente cliente={cliente} key={index} />;
            })}
          </div>

          <div
            className="kanban-block tabla"
            // id="procesos"
            onDrop="drop(event)"
            onDragOver="allowDrop(event)"
          >
            <strong>Prospecto Calificado</strong>
          </div>

          <div
            className="kanban-block tabla"
            // id="completados"
            onDrop="drop(event)"
            onDragOver="allowDrop(event)"
          >
            <strong>Contacto realizado</strong>
          </div>
          <div
            className="kanban-block tabla"
            // id="completados"
            onDrop="drop(event)"
            onDragOver="allowDrop(event)"
          >
            <strong>Primera Cita</strong>
          </div>
          <div
            className="kanban-block tabla"
            // id="completados"
            onDrop="drop(event)"
            onDragOver="allowDrop(event)"
          >
            <strong>Negociación Iniciada</strong>
          </div>
          <div
            className="kanban-block tabla"
            // id="compltaetados"
            onDrop="drop(event)"
            onDragOver="allowDrop(event)"
          >
            <strong>Venta Concretada</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
