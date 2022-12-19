import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <Link to="/courses">
            <button className="btn btn-primary">Registro</button>
          </Link>
        </div>
        <div className="ml-auto">
          <Link to="/courses">
            <button className="btn btn-primary">Inicio de sesion</button>
          </Link>
        </div>
        <div className="ml-auto">
          <Link to="/courses">
            <button className="btn btn-primary">Cursos</button>
          </Link>
        </div>
        <div className="ml-auto">
          <Link to="/profile">
            <button className="btn btn-primary">Perfil</button>
          </Link>
        </div>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">
              Check the Context in action
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
