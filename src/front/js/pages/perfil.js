import React from "react";
import { Link, useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/perfil.css";
import { Navbar } from "../component/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import frase from "../../img/Quotefancy-7034132-3840x2160.jpg";

export const Perfil = () => {
  const navigate = useNavigate();

  const redirection = () => {
    navigate("/video");
  };

  return (
    <div className="d-flex">
      {/* barra de menu */}
      <Navbar />

      {/* pagina */}

      <div className="pagina">
        <div className="info-user">
          <div>
            <img
              className="prof-img"
              src="http://www.flade.co/wp-content/uploads/2016/09/avatar-men.jpg"
            />
          </div>
          <div>
            <div className="nombre-perfil">Hola, Francisco, Bienvenido!</div>
          </div>
        </div>
        <img src={frase} className="imgPerfil" />
      </div>
    </div>
  );
};
