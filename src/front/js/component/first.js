import React from "react";
import "../../styles/home.css";
import one from "../../img/1.jpg";
import { Login } from "../component/login";
export const First = () => {
  return (
    <div className="container mb-5">
      <div className="d-flex">
        <div className="text-start fs-1 fw-bolder text-white me-auto">
          LinkedTeam
        </div>
        <Login />
      </div>
      <div className="d-flex justify-content-between mt-5 ">
        <div className="fw-bolder text-white me-5 font1 text-start">
          Mantente conectado con tu equipo de trabajo
        </div>
        <img src={one} />
      </div>
    </div>
  );
};
