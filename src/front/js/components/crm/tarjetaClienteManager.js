import React from "react";
import PropTypes from "prop-types";
import "../../../styles/dashboard.css";
import { Link } from "react-router-dom";

export const TarjetaClienteManager = ({ children, cliente }) => {
  // console.log(cliente);

  return (
    <div className="tarea fw-bold">
      {children}
      <Link to={`/singleManager/${cliente?.id}`} className="button-single mt-1">
        Detalle
      </Link>
    </div>
  );
};

TarjetaClienteManager.propTypes = {
  children: PropTypes.node,
  cliente: PropTypes.object,
};
