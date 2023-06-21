import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../store/appContext'
import '../../styles/comments.css'
import rigoImageUrl from '../../img/rigo-baby.jpg'
import { useParams } from 'react-router-dom'

export const Comentarios = () => {
  const [comentario, setComentario] = useState('')
  const [responder, setResponder] = useState(false)
  const [respuestas, setRespuestas] = useState({}) // Estado de las respuestas como objeto
  const { store, actions } = useContext(Context)
  const { theid } = useParams()
  console.log(theid)

  const handleRespuestaChange = (event) => {
    setRespuestas({ [event.target.id]: event.target.value })
  }

  console.log(store.respuestas[0])
  useEffect(() => {
    console.log(theid)
    actions.getComentarios(theid)
  }, [])

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          actions.postComentarios(
            {
              content: comentario
            },
            theid
          )
          setComentario('')
          console.log('entro aqui', comentario)
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
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className="comentario-content mb-3 mt-3">
                <div className="comment">
                  <div className="comentario">
                    <p>
                      <strong>{comentario.name}</strong>
                    </p>
                    <p>{comentario.content}</p>
                  </div>
                </div>
                <div className="input-group mb-3 mt-3">
                  <input
                    type="text"
                    id={comentario.id}
                    className="form-control"
                    placeholder="Responde este comentario"
                    aria-label={comentario.id}
                    aria-describedby={comentario.id}
                    onChange={(event) => handleRespuestaChange(event)}
                    value={respuestas[comentario.id] || ''}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => {
                        actions.postRespuestas(
                          respuestas[comentario.id],
                          comentario.id
                        )
                        setRespuestas({})
                      }}
                    >
                      <i className="fa-solid fa-reply"></i> Responder
                    </button>
                  </div>
                </div>
                <button
                  className={responder ? 'd-none' : 'btn btn-warning'}
                  style={{ alignSelf: 'end' }}
                  onClick={(e) => {
                    setResponder(true)
                    actions.getRespuestas(comentario.id)
                  }}
                >
                  <i className="fa-solid fa-reply"></i> Ver respuestas
                </button>
                {store.respuestas.map((resp) => {
                  if (resp.comment_id === comentario.id) {
                    return (
                      <div className="response-content" key={resp.id}>
                        <div className="comentario">
                          <p>
                            <strong>{resp.name}</strong>
                          </p>
                          <p>{resp.content}</p>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
