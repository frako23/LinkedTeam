import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/perfil.css";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import { Box } from "../component/box";
import { AdminPanel } from "./adminPannel";
import { ToDoChart } from "../component/todo";
import { FuelChart } from "../component/fuelChart";
import SetCompany from "../component/setCompany";
// import { ProfileCard } from "../component/profileCard";
// import Example from "../component/charts";
import Swal from "sweetalert2";
import mujer from "../../img/exitosa-empresaria-trabajando-equipo-portatil-su-oficina-vestida-ropa-blanca.jpg";

export const UserPannel = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [salesGoal, setSalesGoal] = useState(0);
  let diasDeUso = actions.calcularDiasDeUso(store.usuario.created_at);

  useEffect(() => {
    actions.getUsuario();
  }, []);

  const id = store.usuario.id;
  if (salesGoal !== 0) {
    console.log(salesGoal, id);
    actions.putUserSalesGoal(salesGoal, id);
    Swal.fire(
      `Excelente! tu meta de ventas es de $ ${salesGoal} vamos por ella 💪`
    );
  }

  useEffect(() => {
    if (store.usuario.sales_goal === null) {
      console.log("entro aqui");
      Swal.fire({
        title: "Para comenzar coloca tu meta de ventas 💰",
        input: "number",
        confirmButtonText: "Registra tu meta 🙌",
        showLoaderOnConfirm: true,
        preConfirm: (salesGoal) => {
          console.log(salesGoal);
          setSalesGoal(salesGoal);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    }
  }, []);

  return (
    <main
      className="d-grid"
      style={
        {
          // paddingLeft: "9rem",
          // paddingRight: "6rem",
        }
      }
    >
      {diasDeUso > 0 ? (
        <span className="badge bg-info text-dark">
          {diasDeUso} dias de uso gratuito
        </span>
      ) : (
        <span className="badge bg-light text-dark">Versión premium</span>
      )}

      <div className="main__title">
        <p className="font-weight-bold text-white mt-4 perfil-titulo">
          Bienvenid@ a LinkedTeam
          <span
            style={{
              color: "rgb(167, 100, 255)",
              fontSize: "3rem",
            }}
          >
            {" "}
            {store.usuario.name}
          </span>
        </p>
      </div>
      <div className="perfil-dashboard">
        <section className="about">
          <div className="image">
            <img src={mujer} className="" />
          </div>
          <div className="content">
            <h3>¿Qué puedes hacer aqui?</h3>
            <h5>Fórmate</h5>
            <p>
              En CURSOS Y VIDEOS encontrarás contenido de alto valor para seguir
              mejorando de forma profesional y persona
            </p>

            <h5>Anota tus pendientes</h5>
            <p>
              En TAREAS PENDIENTES podrás anotar esas actividades claves, y
              hacerles seguimiento con las 3 columnas
            </p>
            <h5>Tu propio CRM</h5>
            <p>
              Con esta APP podrás guardar cada uno de tus prospectos, y usar el
              embudo de ventas para hacer un seguimiento efectivo
            </p>

            <h5>Registra tus actividades</h5>
            <p>
              Al registrar un cliente verás el boton DETALLE con el que podrás
              agregar todas las activiades que haz realizado
            </p>
            {store.usuario.agency === null ? (
              <SetCompany />
            ) : (
              // <Link to="/agencyToSelect" className="button-single" style={{}}>
              //   Regístrate en una agencia
              // </Link>
              ""
            )}
            <h5
              style={{
                marginTop: "1rem",
              }}
            >
              Asi esta tu embudo de ventas
            </h5>
            {/* <div className="icons-container">
              <div className="icons">
                <i className="fas fa-user"></i>
                <span>adsfadfadfsdfsd</span>
              </div>
              <div className="icons">
                <i className="fas fa-user"></i>
                <span>adsfadfadfsdfsd</span>
              </div>
              <div className="icons">
                <i className="fas fa-user"></i>
                <span>adsfadfadfsdfsd</span>
              </div>
              <div className="icons">
                <i className="fas fa-user"></i>
                <span>adsfadfadfsdfsd</span>
              </div>
            </div> */}
            <Box />
          </div>
        </section>

        {/*<div className="main-wrapper-intro">
          <div className="wrapper-intro">
            <div className="intro-square one-intro">
              <h5>Fórmate</h5>
              <p>
                En CURSOS Y VIDEOS encontrarás contenido de alto valor para
                seguir mejorando de forma profesional y persona
              </p>
            </div>
            <div className="intro-square two-intro">
              <h5>Tu propio CRM</h5>
              <p>
                Con esta APP podrás guardar cada uno de tus prospectos, y usar
                el embudo de ventas para hacer un seguimiento efectivo
              </p>
            </div>
            <div className="intro-square three-intro">
              <h5>Registra tus actividades</h5>
              <p>
                Al registrar un cliente verás el boton DETALLE con el que podrás
                agregar todas las activiades que haz realizado
              </p>
            </div>
            <div className="intro-square four-intro">
              <h5>Anota tus pendientes</h5>
              <p>
                En TAREAS PENDIENTES podrás anotar esas actividades claves, y
                hacerles seguimiento con las 3 columnas
              </p>
            </div>
          </div>
        </div> */}
      </div>
      {/* <ToDoChart /> */}
    </main>
  );
};
