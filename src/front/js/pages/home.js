import React, { useContext } from "react";
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

  return (
    <div className="text-center">
      <nav
        className="d-flex container sticky-top"
        style={{
          flexDirection: "unset",
          alignItems: "center",
          marginTop: "2rem",
          background: "rgb(228,233,247)",
          borderRadius: "1rem",
        }}
      >
        <div className="text-start fs-1 fw-bolder text-white me-auto">
          <img src={logo} className="img__landing__logo" loading="lazy" />
          <span
            style={{
              color: "rgb(167, 100, 255)",
              fontSize: "2rem",
            }}
          >
            LinkedTeam
          </span>
        </div>

        <Link to="/signup" className="coolbtn">
          Regístrate
        </Link>

        <Link to="/login" className="coolbtn ms-5">
          Ingresa
        </Link>
      </nav>
      <First />
      {/* <div className="container-video">
        <video autoPlay loop muted width="100%">
          <source src={video} type="video/mp4" />
          Sorry, your browser doesn't support videos.
        </video>
      </div> */}
      <Second />
      <Third />
      <Fourth />
      <Fifth />
    </div>
  );
};
