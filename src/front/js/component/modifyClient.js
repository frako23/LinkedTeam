import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ModifyClient = () => {
  const { store, actions } = useContext(Context);
  const [show, setShow] = useState(false);
  const [cliente, setCliente] = useState({
    nombre: "",
    fecha: "",
    email: "",
    celular: "",
    monto: "",
    confianza: "",
    notas: "",
  });
  const params = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cliente);
    actions.putClientes(cliente, params.theid);
    setCliente({
      nombre: "",
      fecha: "",
      email: "",
      celular: "",
      monto: "",
      confianza: "",
      notas: "",
    });
    handleClose();
  };

  const handleForm = ({ target }) => {
    setCliente({ [target.name]: target.value });
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
                    name="nombre"
                    placeholder="Nombre del cliente"
                    onChange={handleForm}
                    value={cliente.nombre}
                    autoFocus
                  />
                </Col>
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                    placeholder="nombre@correo.com"
                    onChange={handleForm}
                    value={cliente.email}
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
                    name="fecha"
                    onChange={handleForm}
                    value={cliente.fecha}
                    autoFocus
                  />
                </Col>
                <Col>
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    type="tel"
                    name="celular"
                    placeholder="04XX-XXXXXXX"
                    onChange={handleForm}
                    value={cliente.celular}
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
                    name="monto"
                    placeholder="5000"
                    onChange={handleForm}
                    value={cliente.monto}
                    autoFocus
                  />
                </Col>
                <Col>
                  <Form.Label>Nivel de confianza:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="confianza"
                    onChange={handleForm}
                    value={cliente.confianza}
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
                name="notas"
                placeholder="Breve descripción ¿hijos? ¿espos@?"
                onChange={handleForm}
                value={cliente.notas}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
