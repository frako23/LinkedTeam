import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Signup } from "./signup";
import { Login } from "./login";
import { useContext } from "react";
import { Context } from "../store/appContext";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="menu">
      <div style={{ position: "fixed" }} className="ms-2">
        <div className="text-center">
          <Link to="/perfil">
            <i className="fa-solid fa-user mt-5 mb-5 icono text-center"></i>
          </Link>
        </div>
        <div className="text-center">
          <Link to="/courses">
            <i className="fa-solid fa-video mt-5 mb-5 icono text-center"></i>
          </Link>
        </div>
        <div className="text-center">
          <Link to="/dashboard">
            <i className="fa-solid fa-comment-dollar icono mt-5 mb-5 text-center"></i>
          </Link>
        </div>
        <div className="text-center">
          <Link to="/">
            <span className="" onClick={(event) => actions.logout()}>
              <i className="fa-solid fa-person-through-window  icono mt-5 mb-5 text-center"></i>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
