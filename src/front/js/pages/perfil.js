import React from "react";
import { Link, useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/perfil.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Perfil = () => {
  const navigate = useNavigate();

  const redirection = () => {
    navigate("/video");
  };

  return (
    <div className="d-flex">
      {/* barra de menu */}

      <div className="menu">
        <div className="btn signup__button--login">
          <Link to="/perfil">
            <i className="fa-solid fa-user mt-5 mb-5"></i>
          </Link>
        </div>
        <div className="btn signup__button--login">
          <Link to="/courses">
            <i className="fa-solid fa-video mt-5 mb-5"></i>
          </Link>
        </div>
        <div className="btn signup__button--login">
          <Link to="/dashboard">
            <i className="fa-solid fa-comment-dollar mt-5 mb-5"></i>
          </Link>
        </div>
        <div className="ml-auto">
          <button
            className="btn signup__button--login"
            onClick={(event) => actions.logout()}
          >
            <i className="fa-solid fa-person-through-window mt-5 mb-5"></i>
          </button>
        </div>
      </div>

      {/* pagina */}

      <div className="pagina">
        <div className="info-user">
          <div>
            <img className="profile-img" src={rigoImageUrl} />
          </div>
          <div>
            <div className="data-perfil">Hola, Francisco</div>
          </div>
        </div>
        <div className="container-video p-3">
          <div className="card" onClick={redirection}>
            <div className="thumbnail-video">
              <img src="https://i3.ytimg.com/vi/djuWaNxpgig/maxresdefault.jpg" />
              <i className="fa-solid fa-play icono-play"></i>
            </div>

            <div className="info-video text-center">Video 1</div>
          </div>
          <div className="card">
            <div className="thumbnail-video">
              <img src="http://i3.ytimg.com/vi/MXv6J3tCKCY/hqdefault.jpg" />
              <i className="fa-solid fa-play icono-play"></i>
            </div>

            <div className="info-video text-center">Video 2</div>
          </div>
          <div className="card">
            <div className="thumbnail-video">
              <img src="http://i3.ytimg.com/vi/Kcu2hpxKucI/hqdefault.jpg" />
              <i className="fa-solid fa-play icono-play"></i>
            </div>

            <div className="info-video text-center">Video 3</div>
          </div>
          <div className="card">
            <div className="thumbnail-video">
              <img src="http://i3.ytimg.com/vi/iNrPT-RKPHY/hqdefault.jpg" />
              <i className="fa-solid fa-play icono-play"></i>
            </div>

            <div className="info-video text-center">Video 4</div>
          </div>
        </div>
      </div>
    </div>
  );
};
