import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";

export const Nuevonegocio = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <button
        type="button"
        className="btn btn-success ms-5"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <strong>Nuevo Negocio</strong>
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Cliente{" "}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-inputs">
                <strong className="strong-input">Nombre y Apellido </strong>
                <input type="text" id="tarea-nombre" className="input-text" />

                <strong className="strong-input">Email </strong>
                <input type="email" id="tarea-nombre" className="input-text" />

                <strong className="strong-input">Celular </strong>
                <input type="number" id="tarea-nombre" className="input-text" />

                <strong className="strong-input">Notas: </strong>
                <textarea
                  type="text"
                  id="tarea-descripcion"
                  className="textarea-text"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
