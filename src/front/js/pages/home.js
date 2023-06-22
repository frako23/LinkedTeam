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

      {/* <First />
      <Second />
      <Third />
      <Fourth />
      <Fifth /> */}
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
