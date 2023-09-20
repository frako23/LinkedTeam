import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/dashboard.css";
import { Link, useNavigate, useParams } from "react-router-dom";

export const TarjetaCliente = ({ children, cliente }) => {
  const { store, actions } = useContext(Context);
  const { theid } = useParams();
  // console.log(cliente);

  return (
    <div className="tarea fw-bold">
      {children}
      <Link to={`/single/${cliente?.id}`} className="button-single mt-1">
        Detalle
      </Link>

      <button
        className="todo-button"
        onClick={(e) => {
          actions.deleteCliente(cliente?.id);
        }}
      >
        <i className="bx bx-trash fs-5"></i>
      </button>
    </div>
  );
};
