import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Signup } from "./signup";
import { Login } from "./login";
import { useContext } from "react";
import { Context } from "../store/appContext";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import "../../styles/navbar.css";
import logo from "../../img/logoNavBar.png";
import toast, { Toaster } from "react-hot-toast";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState("close");
  const [appBar, setAppBar] = useState(false);

  const toggleFunc = () => {
    if (toggle == "close") {
      setToggle("open");
    } else {
      setToggle("close");
    }
  };

  function handleLogOut() {
    actions.logout();
    navigate("/");
  }

  useEffect(() => actions.getUsuario, []);

  return (
    <nav
      className={`sidebar ${toggle == "close" ? "close" : "open"}`}
      id="body"
    >
      <header>
        <div className="image-text">
          <span className="image">
            <img src={logo} alt="" />
          </span>

          <div className="text logo-text">
            <span className="name">LinkedTeam</span>
          </div>
        </div>
        <a href="#">
          <i
            className={`${toggle} toggle bx bx-chevron-right`}
            onClick={() => toggleFunc()}
          ></i>
        </a>
      </header>

      <div className="menu-bar">
        <div className="menu">
          {/* <li className="search-box">
            <i className="bx bx-search icon"></i>
            <input type="text" placeholder="Search..." />
          </li> */}

          <ul className="p-0">
            <Link to="/perfil">
              <li className="ps-0">
                <i className="bx bx-bar-chart-alt-2 icon"></i>
                <span className="text nav-text">Tablero</span>
                <span className="tooltip">Tablero</span>
              </li>
            </Link>

            <Link to="/courses">
              <li className="ps-0">
                <i className="bx bxl-youtube icon"></i>
                <span className="text nav-text">Cursos y Videos</span>
                <span className="tooltip">Cursos y Videos</span>
              </li>
            </Link>

            <Link to="/dashboard">
              <li className="ps-0">
                <i className="bx bxs-layout icon"></i>
                <span className="text nav-text">CRM</span>
                <span className="tooltip">CRM</span>
              </li>
            </Link>

            <Link to="/todo">
              <li className="ps-0">
                <i className="bx bx-list-ol icon"></i>
                <span className="text nav-text">Tareas pendientes</span>
                <span className="tooltip">Tareas pendientes</span>
              </li>
            </Link>

            {store.usuario.role == "manager" ? (
              <Link to="/OwnAgencyCourses">
                <li className="ps-0">
                  <i className="fa-solid fa-users-rectangle icon"></i>
                  <span className="text nav-text">
                    {store.usuario.own_agency.name}
                  </span>
                  <span className="tooltip">
                    {store.usuario.own_agency.name}
                  </span>
                </li>
              </Link>
            ) : (
              ""
            )}
            <Link to="/pricing">
              <li className="ps-0">
                <i className="fa-regular fa-money-bill-1 icon"></i>
                <span className="text nav-text">Registra tu Pago</span>
                <span className="tooltip">Registra tu Pago</span>
              </li>
            </Link>
            {/* <li className="nav-link">
              <button >
                <i className="bx bx-wallet icon"></i>
                <span className="text nav-text">Wallets</span>
              </a>
            </li> */}
          </ul>
        </div>

        <div className="bottom-content">
          <li className="pe-auto" onClick={(event) => handleLogOut()}>
            <i className="bx bx-log-out icon"></i>
            <span className="text nav-text">Salir</span>
            <span className="tooltip">Salir</span>
          </li>
        </div>
      </div>
    </nav>

    /* <div className="menu">
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
     </div> */
  );
};
