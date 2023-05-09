import React from "react";
import "../../styles/perfil.css";

import { Link } from "react-router-dom";

export const Box = () => {
  return (
    <>
      <div className="card__profile">
        <div className="card__inner ">
          <p className="text-primary">PROSPECTOS</p>
        </div>
        <p className="text-primary font-weight-bold numero">249</p>
      </div>

      <div className="card__profile">
        <div className="card__inner">
          <p className="text-primary">PRECALIFICADOS</p>
        </div>
        <span className="text-primary font-weight-bold numero">83</span>
      </div>

      <div className="card__profile">
        <div className="card__inner">
          <p className="text-primary">PRIMER CONTACTO</p>
        </div>
        <span className="text-primary font-weight-bold numero">79</span>
      </div>

      <div className="card__profile">
        <div className="card__inner">
          <p className="text-primary">PRIMERA CITA</p>
        </div>
        <span className="text-primary font-weight-bold numero">56</span>
      </div>

      <div className="card__profile">
        <div className="card__inner">
          <p className="text-primary">NEGOCIACIÓN</p>
        </div>
        <span className="text-primary font-weight-bold numero">43</span>
      </div>

      <div className="card__profile">
        <div className="card__inner">
          <p className="text-primary">VENTA CONCRETADA</p>
        </div>
        <span className="text-primary font-weight-bold numero">24</span>
      </div>
    </>
  );
};
