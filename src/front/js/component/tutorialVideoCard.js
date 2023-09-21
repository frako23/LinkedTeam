import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import img from "../../img/exitosa-empresaria-trabajando-equipo-portatil-su-oficina-vestida-ropa-blanca.jpg";
import { tutorialVideosData } from "../data/tutorialVideosData";

export function TutorialVideoCard() {
  const { store, actions } = useContext(Context);

  return (
    <div className="container courses__container">
      {tutorialVideosData.map((data) => {
        return (
          <article className="course" key={data.id}>
            <div>
              <img className="course__image" src={data.imgUrl} />
            </div>
            <div className="course__info">
              <h4>{data.title}</h4>
              <p>{data.description}</p>
              <Link to={`/videoTutorial/${data.id}`} className="course__btn">
                Ver curso
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
