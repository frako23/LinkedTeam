import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import "../../../styles/dashboard.css";
import { Link } from "react-router-dom";

export const TarjetaCliente = ({ children, cliente }) => {
  const { actions } = useContext(Context);

  // console.log(cliente);

  return (
    <div className="tarea">
      <div
        className="btn-group px-2"
        role="group"
        aria-label="Basic outlined example"
      >
        <button
          type="button"
          className="btn btn-outline-primary"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Editar"
        >
          <i className="bx bx-edit-alt fs-5"></i>
        </button>
        <Link to={`/single/${cliente?.id}`}>
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Detalle"
          >
            <i className="bx bxs-detail fs-5"></i>
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-outline-primary"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Borrar"
          onClick={() => {
            actions.deleteCliente(cliente?.id);
          }}
        >
          <i className="bx bx-trash fs-5"></i>
        </button>
      </div>
      {children}
    </div>
  );
};

TarjetaCliente.propTypes = {
  children: PropTypes.node,
  cliente: PropTypes.object,
};
