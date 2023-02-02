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

  useEffect(() => {
    if (store.token && store.token != "" && store.token !== undefined) {
      console.log("Redireccionar a perfil");
      navigate("/perfil");
    } else {
      navigate("/");
    }
  }, [store.token]);

  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <div className="ml-auto">
        <Link to="/perfil">
          <i className="fa-solid fa-user text-white mt-5 mb-5"></i>
        </Link>
      </div>
      <div className="ml-auto">
        <Link to="/courses">
          <i className="fa-solid fa-video text-white mt-5 mb-5"></i>
        </Link>
      </div>
      <div className="ml-auto">
        <button
          className="btn signup__button--login"
          onClick={(event) => actions.logout()}
        >
          <i className="fa-solid fa-person-through-window text-white mt-5 mb-5"></i>
        </button>
      </div>
      {/* <Dropdown>
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
                </Dropdown> */}
    </Nav>
  );
};
