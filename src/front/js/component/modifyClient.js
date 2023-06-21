import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ModifyClient = () => {
  const { store, actions } = useContext(Context);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [monto, setMonto] = useState("");
  const [confianza, setConfianza] = useState("");
  const [estatus, setEstatus] = useState("");
  const [notas, setNotas] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("este es el evento");
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="btn btn-warning btn-lg mb-3"
      >
        Modificar Cliente
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Nombre y Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Nombre del cliente"
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                    value={nombre}
                    autoFocus
                  />
                </Col>
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                    placeholder="nombre@correo.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    autoFocus
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    placeholder="name@example.com"
                    onChange={(e) => setFecha(e.target.value)}
                    value={fecha}
                    autoFocus
                  />
                </Col>
                <Col>
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    type="tel"
                    required
                    placeholder="04XX-XXXXXXX"
                    onChange={(e) => setCelular(e.target.value)}
                    value={celular}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Monto</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    placeholder="5000"
                    value={monto}
                    onChange={(e) => setMonto(Number(e.target.value))}
                    autoFocus
                  />
                </Col>
                <Col>
                  <Form.Label>Nivel de confianza:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    value={confianza}
                    onChange={(e) => setConfianza(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Notas</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Breve descripción ¿hijos? ¿espos@?"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={() => alert("entró acá")}
            type="submit"
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <button
        type="button"
        className="btn btn-success ms-5"
        // data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => setShowForm(true)}
      >
        <strong>Nuevo Negocio</strong>
      </button>

      {showForm && (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <form
            className="needs-validation"
            onSubmit={(e) => {
              e.preventDefault();
              if (
                nombre != "" &&
                fecha != "" &&
                email != "" &&
                celular != "" &&
                monto != "" &&
                estatus != "" &&
                confianza != "" &&
                notas != ""
              ) {
                actions.postClientes({
                  nombre: nombre,
                  fecha: fecha,
                  email: email,
                  celular: celular,
                  monto: monto,
                  estatus: estatus,
                  confianza: confianza,
                  notas: notas,
                });
                setNombre("");
                setFecha("");
                setEmail("");
                setCelular("");
                setMonto("");
                setConfianza("");
                setEstatus("");
                setNotas("");
                setShowForm(false);
                console.log("entro aqui");
              }
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Cliente
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="container-inputs">
                    <strong className="strong-input">Nombre y Apellido </strong>
                    <input
                      type="text"
                      id="tarea-nombre"
                      required
                      className="input-text"
                      placeholder="Pedro Pérez"
                      onChange={(e) => {
                        setNombre(e.target.value);
                      }}
                      value={nombre}
                    />

                    <strong className="strong-input">
                      Fecha de Nacimiento{" "}
                    </strong>
                    <input
                      type="date"
                      id="tarea-nombre"
                      required
                      className="input-text"
                      placeholder="07/01/1976"
                      onChange={(e) => setFecha(e.target.value)}
                      value={fecha}
                    />

                    <strong className="strong-input">Email </strong>
                    <input
                      type="email"
                      id="tarea-nombre"
                      required
                      pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                      className="input-text"
                      placeholder="correo@mail.com"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />

                    <strong className="strong-input">Celular </strong>
                    <input
                      type="tel"
                      id="tarea-nombre"
                      required
                      className="input-text"
                      placeholder="04XX-XXXXXXX"
                      onChange={(e) => setCelular(e.target.value)}
                      value={celular}
                    />

                    <strong className="strong-input">Monto </strong>
                    <input
                      type="number"
                      id="tarea-nombre"
                      required
                      className="input-text"
                      placeholder="5000"
                      value={monto}
                      onChange={(e) => setMonto(Number(e.target.value))}
                    />

                    <label htmlFor="cars">
                      <strong>Estatus:</strong>
                    </label>
                    <select
                      id="cars"
                      name="cars"
                      required
                      value={estatus}
                      onChange={(e) => setEstatus(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Prospecto">Prospecto</option>
                      <option value="Contactado">Contactado</option>
                      <option value="Primera Cita">Primera Cita</option>
                      <option value="Negociación">Negociación</option>
                      <option value="Cerrado">Cerrado</option>
                    </select>

                    <label htmlFor="cars">
                      <strong>Nivel de confianza:</strong>
                    </label>
                    <select
                      id="cars"
                      name="cars"
                      required
                      value={confianza}
                      onChange={(e) => setConfianza(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Alta">Alta</option>
                      <option value="Media">Media</option>
                      <option value="Baja">Baja</option>
                    </select>

                    <strong className="strong-input">Notas: </strong>
                    <textarea
                      type="text"
                      id="tarea-descripcion"
                      className="textarea-text"
                      rows="4"
                      required
                      placeholder="Breve descripción ¿hijos? ¿espos@?"
                      value={notas}
                      onChange={(e) => setNotas(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    id="tarea-nombre"
                    className="btn btn-success"
                    // data-bs-dismiss="modal"
                    value="Enviar"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )} */}
    </>
  );
};
