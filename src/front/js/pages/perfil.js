import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/perfil.css";
import { Navbar } from "../component/navbar";
import { Box } from "../component/box";
import { ToDoChart } from "../component/todo";
import { FuelChart } from "../component/fuelChart";
// import { ProfileCard } from "../component/profileCard";
// import Example from "../component/charts";

export const Perfil = () => {
  const navigate = useNavigate();

  const redirection = () => {
    navigate("/video");
  };

  return (
    <div className="" style={{ height: "100vh" }}>
      {/* barra de menu */}
      <Navbar />

      {/* pagina */}

      <main className="main__container d-grid" 
            style={{ 
              paddingLeft: "11rem",
              paddingRight: "6rem" 
              }}>
        <div className="main__title">
          <p className="font-weight-bold text-white mt-4">TABLERO DE CONTROL</p>
        </div>
        <Box />
      <FuelChart />
      {/* <ToDoChart /> */}
      </main>
      
    </div>
  );
};
