import React from "react";
import "../../styles/home.css";
import one from "../../img/1.jpg";

export const First = () => {
  return (
    <div className="container mb-5">
      <div className="text-start fs-1 fw-bolder text-white mb-5">
        LinkedTeam
      </div>
      <div className="d-flex justify-content-between">
        <div className="fw-bolder text-white me-5 font1 text-start">
          Mantente conectado con tu equipo de trabajo
        </div>
        <img src={one} className="" />
      </div>
    </div>
  );
};
