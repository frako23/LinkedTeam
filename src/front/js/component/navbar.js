import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Signup } from "./signup";
import { Login } from "./login";
import { useContext } from "react";
import { Context } from "../store/appContext";
import Dropdown from "react-bootstrap/Dropdown";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">LinkedTeam</span>
        </Link>
        <div className="d-flex flex-row p-1 text-center">
          <div className="d-flex align-items-end me-4">
            {!store.token ? (
              <Signup />
            ) : (
              <>
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
                <Dropdown>
                  <Dropdown.Toggle
                    className="btn signup__button--register ms-2"
                    variant="success"
                    id="dropdown-basic"
                  >
                    Favoritos (
                    {store.favoritos.length > 0 ? store.favoritos.length : 0})
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {store.favoritos.map((fav) => {
                      return (
                        <Dropdown.Item key={fav} className="suggestions">
                          {fav}{" "}
                          <span
                            type="button"
                            className="btn btn-secondary btn-sm mx-2 boton"
                            onClick={(event) => actions.toggleFavorite(fav)}
                          >
                            <i class="fa-solid fa-trash"></i>
                          </span>
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </div>

          <div className="d-flex align-items-between ms-1">
            {!store.token ? (
              <Login />
            ) : (
              <button
                className="btn signup__button--login"
                onClick={(event) => actions.logout()}
              >
                Salir
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        {store.notification && (
          <div
            className="alert alert-success"
            onClick={(e) => actions.setNotification(undefined)}
            role="alert"
          >
            {store.notification}
          </div>
        )}
      </div>
    </nav>
  );
};
