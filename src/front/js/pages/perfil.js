import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/perfil.css";
import { Navbar } from "../component/navbar";
import { Box } from "../component/box";
import { ToDoChart } from "../component/todo";
import { FuelChart } from "../component/fuelChart";
// import { ProfileCard } from "../component/profileCard";
// import Example from "../component/charts";
import mujer from "../../img/mujer-portatil-pulgares-arriba-firman-camisa-blanca-oficina-aislada-sobre-fondo-blanco-removebg-preview.png";

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

      <main className="d-grid" 
            style={{ 
              paddingLeft: "9rem",
              paddingRight: "6rem" 
              }}>
        <div className="main__title">
          <p className="font-weight-bold text-white mt-4">Bienvenid@ a LinkedTeam</p>
        </div>
        <div className="perfil-dashboard">
          <Box />

          <div className="main-wrapper-intro">
              <div className="wrapper-intro">
                  <div className="intro-square one-intro">
                      <h5>Fórmate</h5>
                      <p>En la sección "Cursos y videos" tendrás una galeria con todos el contenido disponible para tu formación, el contenido es dinámico asi que siempre conseguiras algo nuevo que aprender</p>
                  </div>
                  <div className="intro-square two-intro">
                    <h5>Tu propio CRM</h5>
                    <p>En la sección "CRM" en donde podras guardar cada uno de tus prospectos, y usar el embudo de ventas para colocarlo en el lugar adecuado </p>
                  </div>
                  <div className="intro-square three-intro">
                    <h5>Formate</h5>
                    <p>En la sección "Cursos y videos" tendrás una galeria con todos el contenido disponible para tu formación, el contenido es dinámico asi que siempre conseguiras algo nuevo que aprender</p>
                  </div>
                  <div className="intro-square four-intro">
                    <h5>Formate</h5>
                    <p>En la sección "Cursos y videos" tendrás una galeria con todos el contenido disponible para tu formación, el contenido es dinámico asi que siempre conseguiras algo nuevo que aprender</p>
                  </div>
              </div>
          </div>
          
          <img src={mujer} className="img-intro"/>
        </div>
      {/* <ToDoChart /> */}
      
      
      
      </main>
      
    </div>
  );
};
