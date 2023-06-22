import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
// import video from "../../video/background.mp4";
import "../../styles/home.css";
import { First } from "../component/first";
import { Second } from "../component/second";
import { Third } from "../component/third";
import { Fourth } from "../component/fourth";
import { Fifth } from "../component/fifth";
import { Link } from "react-router-dom";
import logo from "../../img/logoNavBar.png";
import Button from "react-bootstrap/Button";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [menuBar, setMenuBar] = useState(false);
  return (
    <>
      {/* comienza la seccion del header */}

      <section className="header">
        <Link to={"/"} className="logo">
          LinkedTeam
        </Link>

        <nav className={`navbar ${menuBar ? "active" : ""}`}>
          <Link to="/signup" className="">
            ¿Qué podrás hacer?
          </Link>

          <Link to="/signup" className="">
            Regístrate
          </Link>

          <Link to="/login" className="">
            Ingresa
          </Link>
        </nav>

        <div
          id="menu-btn"
          onClick={() => {
            if (menuBar != true) {
              setMenuBar(true);
            } else {
              setMenuBar(false);
            }
          }}
          className={menuBar ? "fas fa-xmark" : "fas fa-bars"}
        >
          {" "}
        </div>
      </section>

      {/* termina la sección del header */}

      {/* empieza la sección de servicios */}

      <section className="services">
        <h1 className="heading-tittle">
          {" "}
          ¿Qué podrás hacer en <span>LinkedTeam</span>?
        </h1>
        <div className="box-container">
          <div className="box">
            <i className="bx bxl-youtube icon"></i>
            <h4>Plataforma de formación</h4>
            <h6>
              Podrás cargar contenido de alto valor para a tu equipo de trabajo
            </h6>
          </div>
          <div className="box">
            <i className="bx bxs-layout icon"></i>
            <h4>CRM</h4>
            <h6>
              Podrás guardar cada uno de tus prospectos, y usar el embudo de
              ventas para hacer un seguimiento efectivo
            </h6>
          </div>
          <div className="box">
            <i className="bx bx-list-ol icon"></i>
            <h4>App de tareas pendientes</h4>
            <h6>
              Podrás anotar esas tareas claves, para hacerles con el método
              Kanban
            </h6>
          </div>
        </div>
      </section>
      {/* termina la sección de servicios */}

      {/* comienza el footer */}

      <section className="footer">
        <h3>Información de Contacto</h3>
        <div className="box">
          <a href="#">
            {" "}
            <i className="fa-brands fa-whatsapp"></i> +(58)0412-XXXXXX
          </a>
          <a href="mailto:linkedteam2023@gmail.com">
            {" "}
            <i className="fas fa-envelope"></i> linkedteam2023@gmail.com
          </a>
          <a href="#">
            {" "}
            <i className="fas fa-map"></i> Caracas, Venezuela
          </a>
        </div>

        <div className="credit">
          {" "}
          Creado por <span>Devix</span> todos los derechos reservados!
        </div>
      </section>

      {/* termina el footer */}
    </>
  );
};
