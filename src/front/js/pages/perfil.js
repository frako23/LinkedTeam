import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/perfil.css";
import { Navbar } from "../component/navbar";
import { Box } from "../component/box";
import { ToDoChart } from "../component/todo";
import { ProfileCard } from "../component/profileCard";
import Example from "../component/charts";

export const Perfil = () => {
  const navigate = useNavigate();

  const redirection = () => {
    navigate("/video");
  };

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* barra de menu */}
      <Navbar />

      {/* pagina */}

      <main
        className="main__container d-grid gap-4"
        style={{ paddingLeft: "8rem" }}
      >
        <div className="main__title">
          <p className="font-weight-bold text-white">TABLERO DE CONTROL</p>
        </div>
        <Box />
      </main>
      <ProfileCard />
      <Example />
      {/* <ToDoChart /> */}
    </div>
  );
};
