import React from "react";

export const Login = () => {
  return (
    <form style={{ width: "20rem" }} className="login">
      <h1 className="loginH1">
        <strong>Ingresa aqui</strong>
      </h1>
      {/* <!-- Email input --> */}
      <div class="form-outline mb-4">
        <input
          type="email"
          id="form2Example1"
          class="form-control"
          placeholder="tucorreo@correo.com"
        />
        <label class="form-label" for="form2Example1">
          Correo Electrónico
        </label>
      </div>

      {/* <!-- Password input --> */}
      <div class="form-outline mb-4">
        <input
          type="password"
          id="form2Example2"
          class="form-control"
          placeholder="contraseña1234..."
        />
        <label class="form-label" for="form2Example2">
          Contraseña
        </label>
      </div>

      {/* <!-- 2 column grid layout for inline styling --> */}
      <div class="row mb-4">
        <div class="col d-flex justify-content-center">
          {/* <!-- Checkbox --> */}
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="form2Example31"
              checked
            />
            <label class="form-check-label" for="form2Example31">
              {" "}
              Recuérdame{" "}
            </label>
          </div>
        </div>

        <div class="col">
          {/* <!-- Simple link --> */}
          <a href="#!">¿Olvidaste tu contraseña?</a>
        </div>
      </div>

      {/* Submit button */}
      <button type="button" class="btn btn-primary btn-block mb-4">
        Ingresar
      </button>

      {/* <!-- Register buttons --> */}
      <div class="text-center">
        <p>¿No estas inscito? escribe un correo para registrarte</p>
      </div>
    </form>
  );
};
