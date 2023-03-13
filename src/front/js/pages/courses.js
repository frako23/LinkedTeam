import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";

export const Courses = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const redirection = () => {
    navigate("/video");
  };

  return (
    <div className="d-flex">
      <Navbar />
      <div className="pagina">
        <h1 className="text-white text-center mt-5">Cursos disponibles</h1>
        <div className="container-video p-3">
          <div className="card" onClick={redirection}>
            <div className="thumbnail-video">
              <img src="https://i3.ytimg.com/vi/djuWaNxpgig/maxresdefault.jpg" />
              <i className="fa-solid fa-play icono-play"></i>
            </div>

            <div className="info-video text-center fw-bolder">
              Taller de iniciación al negocio
            </div>
          </div>
          <div className="card">
            <div className="thumbnail-video">
              <img src="http://i3.ytimg.com/vi/MXv6J3tCKCY/hqdefault.jpg" />
              <i className="fa-solid fa-play icono-play"></i>
            </div>

            <div className="info-video text-center fw-bolder">
              Comienza HOY!!
            </div>
          </div>
          <div className="card">
            <div className="thumbnail-video">
              <img src="http://i3.ytimg.com/vi/Kcu2hpxKucI/hqdefault.jpg" />
              <i className="fa-solid fa-play icono-play"></i>
            </div>

            <div className="info-video text-center fw-bolder">
              El circulo de la vida
            </div>
          </div>
          <div className="card">
            <div className="thumbnail-video">
              <img src="http://i3.ytimg.com/vi/iNrPT-RKPHY/hqdefault.jpg" />
              <i className="fa-solid fa-play icono-play"></i>
            </div>

            <div className="info-video text-center fw-bolder">
              Lo que no sabias de los seguros de vida
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
