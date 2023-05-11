import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";

export const Tarjetacliente = ({ children }) => {
  const { store, actions } = useContext(Context);

  return <div className="tarea fw-bold">{children}</div>;
};
