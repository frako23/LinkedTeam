import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import "../../styles/index.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  // console.log("Este es tu token", store.token);

  const handleClick = () => {
    // const success = await
    actions.login(email, password);
    // success && navigate("/");
  };

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined) {
      console.log("entrando al use effect");
      navigate("/perfil");
    }
  }, [store.token]);
  return (
    <form style={{ width: "20rem" }} className="login">
      <h1 className="loginH1">
        <strong>Ingresa aqui</strong>
      </h1>
      {/* <!-- Email input --> */}
      <div className="form-outline mb-4">
        <input
          type="email"
          id="form2Example1"
          className="form-control"
          placeholder="tucorreo@correo.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="form-label" htmlFor="form2Example1">
          Correo Electrónico
        </label>
      </div>

      {/* <!-- Password input --> */}
      <div className="form-outline mb-4">
        <input
          type="password"
          id="form2Example2"
          className="form-control"
          placeholder="contraseña1234..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="form-label" htmlFor="form2Example2">
          Contraseña
        </label>
      </div>

      {/* <!-- 2 column grid layout for inline styling --> */}
      <div className="row mb-4">
        <div className="col d-flex justify-content-center">
          {/* <!-- Checkbox --> */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="form2Example31"
            />
            <label className="form-check-label" htmlFor="form2Example31">
              {" "}
              Recuérdame{" "}
            </label>
          </div>
        </div>

        <div className="col">
          {/* <!-- Simple link --> */}
          <a href="#!">¿Olvidaste tu contraseña?</a>
        </div>
      </div>

      {/* Submit button */}
      <div className="d-flex justify-content-evenly">
        <Link to="/">
          <button type="button" className="btn btn-danger btn-block mb-4">
            Regresar
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-success btn-block mb-4"
          onClick={handleClick}
        >
          Ingresar
        </button>
      </div>
      {/* <!-- Register buttons --> */}
      <div className="text-center">
        <p>¿No estas inscito? escribe un correo para registrarte</p>
      </div>
    </form>
  );
};
