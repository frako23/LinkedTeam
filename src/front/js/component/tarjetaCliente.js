import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";

export const Tarjetacliente = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="tarea text-white">
      {props.cliente.nombre}
      <br></br>
      {props.cliente.fecha}
      <br></br>${props.cliente.monto}
      <br></br>
      Confianza {props.cliente.confianza}
    </div>
  );
};
