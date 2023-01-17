import React from "react";
import "../../styles/comments.css";

export const Comentarios = () => {
  return (
    <div className="container-comentarios">
      <div className="comentario">
        <textarea
          className="input-comentario"
          placeholder="Escribe tu comentario o pregunta"
        ></textarea>
      </div>
      <div className="comentario-publicado"></div>
    </div>
  );
};
