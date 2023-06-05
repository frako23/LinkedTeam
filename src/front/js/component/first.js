import React from "react";
import "../../styles/home.css";
import one from "../../img/1.jpg";
import { Link } from "react-router-dom";
import logo from "../../img/logoNavBar.png";

export const First = () => {
  return (
    <div className="container mb-5">
      <div className="d-flex">
        <div className="text-start fs-1 fw-bolder text-white me-auto">
          <img src={logo} className="img__landing__logo" />
          <span
              style={{
                color:"rgb(167, 100, 255)",
                fontSize: "3rem"
              }}
              >
                LinkedTeam
              </span> 
        </div>

        <Link to="/signup">
          <button className="coolbtn" variant="primary">
            Regístrate
          </button>
        </Link>

        <Link to="/login">
          <button className="coolbtn ms-5" variant="primary">
            Ingresa
          </button>
        </Link>
      </div>
      <div className="d-flex justify-content-between mt-5 ">
        <div className="fw-bolder text-white me-5 font1 text-start">
          Mantente conectado con tu equipo de trabajo
        </div>
        <img className="landing__img" src={one} />
      </div>
    </div>
  );
};
