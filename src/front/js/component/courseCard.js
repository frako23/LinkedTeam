import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import img from "../../img/exitosa-empresaria-trabajando-equipo-portatil-su-oficina-vestida-ropa-blanca.jpg";

export function CourseCard() {
  const { store, actions } = useContext(Context);
  // console.log(store.usuario.agency);
  useEffect(() => actions.getUsuario(), []);

  if (store.usuario.agency !== null) {
    useEffect(() => actions.getCourses(store.usuario.agency_id), []);
    // console.log(store.courses);
  }

  return (
    <>
      {store.usuario.agency !== null && store.usuario.agency !== undefined ? (
        <div className="container courses__container">
          {store.courses.map((data) => {
            return (
              <article className="course" key={data.id}>
                <div>
                  <img className="course__image" src={data.img_url} />
                </div>
                <div className="course__info">
                  <h4>{data.title}</h4>
                  <p>{data.description}</p>
                  <Link to={`/video/${data.id}`} className="course__btn">
                    Ver curso
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="agency-not-set">
          <img src={img} />
          <Link to="/perfil">
            <h2>Primero debes seleccionar la agencia a la que perteneces</h2>
          </Link>
        </div>
      )}
    </>
  );
}
