import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/perfil.css";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import { Box } from "../component/box";
import { AdminPanel } from "./adminPannel"
import { ToDoChart } from "../component/todo";
import { FuelChart } from "../component/fuelChart";
// import { ProfileCard } from "../component/profileCard";
// import Example from "../component/charts";
import mujer from "../../img/mujer-portatil-pulgares-arriba-firman-camisa-blanca-oficina-aislada-sobre-fondo-blanco-removebg-preview.png";

export const UserPannel = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  useEffect(() => {actions.getUsuario()}, []);

  return (

    <main className="d-grid" 
            style={{ 
              paddingLeft: "9rem",
              paddingRight: "6rem" 
              }}>
          <span className="badge bg-info text-dark">{actions.calcularDiasDeUso(store.usuario.created_at)} dias de uso gratuito</span>
        <div className="main__title">
          {store.usuario.agency_ybt === null ?
          
          <Link 
                to="/agencyToSelect" 
                className="coolbtn"
                style={{
                  marginTop: "2.5rem",
                  right: "5rem"
              }}>
              Regístrate en una agencia
          </Link> : ""
            }
          <p className="font-weight-bold text-white mt-4">Bienvenid@ a LinkedTeam   
                      <span style={{
                            color:"rgb(167, 100, 255)",
                            fontSize: "3rem"
                            }}> {store.usuario.name}</span></p>
        </div>
        <div className="perfil-dashboard">
          <Box />

          <div className="main-wrapper-intro">
              <div className="wrapper-intro">
                  <div className="intro-square one-intro">
                      <h5>Fórmate</h5>
                      <p>En CURSOS Y VIDEOS encontrarás contenido de alto valor para seguir mejorando de forma profesional y persona</p>
                  </div>
                  <div className="intro-square two-intro">
                    <h5>Tu propio CRM</h5>
                    <p>Con esta APP podrás guardar cada uno de tus prospectos, y usar el embudo de ventas para hacerle un seguimiento efectivo</p>
                  </div>
                  <div className="intro-square three-intro">
                    <h5>Registra tus actividades</h5>
                    <p>Al registrar un cliente verás el boton DETALLE con el que podrás agregar todas las activiades que haz realizado</p>
                  </div>
                  <div className="intro-square four-intro">
                    <h5>Anota tus pendientes</h5>
                    <p>En TAREAS PENDIENTES podrás anotar esas actividades claves, y hacerles seguimiento con las 3 columnas</p>
                  </div>
              </div>
          </div>
          
          <img src={mujer} className="img-intro"/>
        </div>
      {/* <ToDoChart /> */}
      
      
      
      </main>)
}