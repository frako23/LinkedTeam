import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/comments.css";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { useParams } from "react-router-dom";

export const Comentarios = () => {
  const [comentario, setComentario] = useState("");
  const [responder, setResponder] = useState(false);
  const [respuesta, setRespuesta] = useState("");
  const { store, actions } = useContext(Context);
  const { theid } = useParams();
  console.log(theid);
  // async function getcomentarios() {
  //   try {
  //     const resp = await fetch(`https://jsonplaceholder.typicode.com/comentarios`);

  //     if (!resp.ok) {
  //       let danger = await resp.json();
  //       alert(danger);
  //       return;
  //     }

  //     const data = await resp.json();
  //     setComentarios(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    console.log(theid);
    actions.getComentarios(theid);
  }, []);

  useEffect(() => {
    console.log(theid);
    actions.getRespuestas(1);
  }, []);
  // useEffect(() => {
  //   for (let index = 0; index < store.comentarios.length; index++) {
  //     const element = store.comentarios[index];
  //     console.log(element.id);
  //     actions.getRespuestas(element.id);
  //   }
  // }, [store.comentarios]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          actions.postComentarios(
            {
              content: comentario,
            },
            theid
          );
          setComentario("");
          console.log("entro aqui", comentario);
        }}
      >
        <div className="container-comentarios">
          <h4 className="comment-header">
            Escribe aquí cualquier duda o comentario
          </h4>
          <div className="new-comentario">
            <textarea
              className="input-comentario"
              placeholder="Escribe tu pregunta o comentario"
              onChange={(e) => setComentario(e.target.value)}
              value={comentario}
            ></textarea>
            <div className="form-group">
              <button type="submit" id="post" className="btn btn-warning">
                Publicar
              </button>
            </div>
          </div>
        </div>
      </form>

      {store.comentarios.map((comentario) => {
        return (
          <div className="comentario-publicado" key={comentario.id}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="comentario-content">
                <div className="comment">
                  <div className="img-user">
                    <img className="profile-img" src={rigoImageUrl} />
                  </div>
                  <div className="comentario">
                    <p>
                      <strong>{comentario.name}</strong>
                    </p>
                    <p>{comentario.content}</p>
                  </div>
                </div>
                <button
                  className={responder ? "d-none" : "btn btn-warning"}
                  onClick={(e) => setResponder(true)}
                >
                  <i className="fa-solid fa-reply"></i> Responder
                </button>
                {responder && (
                  <div className="input-group mb-3 mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Responde este comentario"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onChange={(e) => setRespuesta(e.target.value)}
                      value={respuesta}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-secondary" type="button">
                        <i className="fa-solid fa-reply"></i> Responder
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="response-content">
                <div className="img-user">
                  <img className="profile-img" src={rigoImageUrl} />
                </div>
                <div className="comentario">
                  <p>
                    <strong>{comentario.name}</strong>
                  </p>
                  <p>{comentario.content}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
