import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import "../../../styles/dashboard.css";
import { Link } from "react-router-dom";

export const TarjetaCliente = ({ children, cliente }) => {
  const { actions } = useContext(Context);

  // console.log(cliente);

  return (
    <div className="tarea fw-bold">
      {children}
      <Link to={`/single/${cliente?.id}`} className="button-single mt-1">
        Detalle
      </Link>

      <button
        className="todo-button"
        onClick={() => {
          actions.deleteCliente(cliente?.id);
        }}
      >
        <i className="bx bx-trash fs-5"></i>
      </button>
    </div>
  );
};

TarjetaCliente.propTypes = {
  children: PropTypes.node,
  cliente: PropTypes.object,
};
