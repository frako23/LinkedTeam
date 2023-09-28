import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";

export const Nuevonegocio = () => {
  const { store, actions } = useContext(Context);
  const [cliente, setCliente] = useState({
    name: "",
    birthdate: "",
    email: "",
    cellphone: "",
    amount: "",
    status: "",
    trust: "",
    notes: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(cliente);
    actions.postClientes(cliente);
    handleClose();
    setCliente({
      name: "",
      birthdate: "",
      email: "",
      cellphone: "",
      amount: "",
      status: "",
      trust: "",
      notes: "",
    });
    Swal.fire({
      title: "Registraste tú cliente correctamente 🙌",
      confirmButtonText: "OK",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const handleForm = ({ target }) => {
    setCliente({ ...cliente, [target.name]: target.value });
  };

  return (
    <>
      <button
        variant="primary"
        onClick={handleShow}
        className="button-single"
        style={{ height: "fit-content" }}
      >
        Nuevo Negocio
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Datos del cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre y Apellido</Form.Label>
              <Form.Control
                type="text"
                required
                name="name"
                placeholder="Nombre del cliente"
                onChange={handleForm}
                value={cliente.name}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    type="tel"
                    required
                    name="cellphone"
                    placeholder="04XX-XXXXXXX"
                    onChange={handleForm}
                    value={cliente.cellphone}
                  />
                </Col>
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
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
                    required
                    name="birthdate"
                    onChange={handleForm}
                    value={cliente.birthdate}
                    autoFocus
                  />
                </Col>
                <Col>
                  <Form.Label>Monto</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    placeholder="5000"
                    name="amount"
                    value={cliente.amount}
                    onChange={handleForm}
                    autoFocus
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Estatus:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="status"
                    value={cliente.status}
                    onChange={handleForm}
                  >
                    <option value=""></option>
                    <option value="Prospecto">Prospecto</option>
                    <option value="Contactado">Contactado</option>
                    <option value="Primera Cita">Primera Cita</option>
                    <option value="Negociación">Negociación</option>
                    <option value="Cerrado">Cerrado</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Nivel de confianza:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="trust"
                    value={cliente.trust}
                    onChange={handleForm}
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
                name="notes"
                rows={3}
                placeholder="Breve descripción ¿hijos? ¿espos@?"
                value={cliente.notes}
                onChange={handleForm}
                required
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
