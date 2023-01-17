import React from "react";
import "../../styles/home.css";
import two from "../../img/2.jpg";

export const Third = () => {
  return (
    <div className="container mb-5">
      <div className="text-center d-flex justify-content-between">
        <div className="me-5">
          <span className="fs-1 fw-bolder me-5">
            Forma a tu equipo de trabajo
          </span>
          <p className="fs-5 fw-bolder text-white">
            Usa LinkedTeam para crear tus propios módulos de formación online
            para tu equipo de trabajo. Deja la formación en manos de LinkedTeam
            y concentrate en las actividades que aportan mayor valor a tu
            negocio, vender y reclutar
          </p>
        </div>

        <img src={two} className="" />
      </div>
    </div>
  );
};
