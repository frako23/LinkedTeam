import React, { useEffect, useState } from "react";
import "../../styles/comments.css";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const resp = await fetch(
          `https://jsonplaceholder.typicode.com/comments`
        );

        console.log("Aqui2");
        if (!resp.ok) {
          let danger = await resp.json();
          alert(danger);
        }
        const data = await resp.json();
        setComentarios(data);
      };
      console.log("Aqui");
      fetchData();
    } catch (error) {
      console.error("There has been an error fecth");
    }
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
          <div className="comentario-publicado">
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
