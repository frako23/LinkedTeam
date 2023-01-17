import React from "react";
import "../../styles/home.css";
import one from "../../img/1.jpg";

export const First = () => {
  return (
    <div className="container">
      <div>LinkedTeam</div>
      <div>
        <div>Mantente conectado con tu equipo de trabajo</div>
        <img src={one} />
      </div>
    </div>
  );
};
