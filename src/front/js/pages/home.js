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

        <nav className={`navbar ${menuBar && "active"}`}>
          <Link to="/login" className="">
            Ingresa
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
          className="fas fa-bars"
        >
          {" "}
        </div>
      </section>
      <First />
      <Second />
      <Third />
      <Fourth />
      <Fifth />
    </>
  );
};
