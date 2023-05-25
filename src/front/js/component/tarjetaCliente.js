import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/dashboard.css";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Tarjetacliente = ({ children, cliente}) => {
  const { store, actions } = useContext(Context);
	const { theid } = useParams();
  console.log(cliente);

  return <div 
            className="tarea fw-bold">{children}
            <Link to={`/single/${cliente?.id}`} 
              className="btn btn-primary">
            Detalle
            </Link>
          </div>;
};
