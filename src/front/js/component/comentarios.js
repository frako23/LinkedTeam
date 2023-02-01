import React, { useEffect, useState } from "react";
import "../../styles/comments.css";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);

  async function getComments() {
    try {
      const resp = await fetch(`https://jsonplaceholder.typicode.com/comments`);

      if (!resp.ok) {
        let danger = await resp.json();
        alert(danger);
        return;
      }

      const data = await resp.json();
      setComentarios(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <div className="container-comentarios">
        <div className="new-comentario">
          <textarea
            className="input-comentario"
            placeholder="Escribe tu comentario o pregunta"
          ></textarea>
        </div>
      </div>
      <div className="comentario-publicado">
        <div className="comentario-content">
          <div className="img-user">
            <img className="profile-img" src={rigoImageUrl} />
          </div>
          <div className="comentario">
            <p>
              <strong>@Daniel Moret</strong>
            </p>
            <p>
              Una alternativa a Atom es Visual Studio Code, este es el editor de
              código más usado actualmente. Una alternativa a Atom es Visual
              Studio Code
            </p>
          </div>
        </div>
      </div>

      {comentarios.map((comentario) => {
        return (
          <div className="comentario-publicado" key={comentario.id}>
            <div className="comentario-content">
              <div className="img-user">
                <img className="profile-img" src={rigoImageUrl} />
              </div>
              <div className="comentario">
                <p>
                  <strong>{comentario.email}</strong>
                </p>
                <p>{comentario.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
