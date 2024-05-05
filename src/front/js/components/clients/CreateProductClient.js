import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { Col, Row } from "react-bootstrap";

function CreateProductClient() {
  const [show, setShow] = useState(false);
  const { store, actions } = useContext(Context);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [clienteProducto, setClienteProducto] = useState({
    product: "",
    amount: "",
    date_of_closing: "",
    payment_recurrence: "",
    notes: "",
  });
  const id = sessionStorage.getItem("usuario.id");
  const handleForm = ({ target }) => {
    setClienteProducto({ ...clienteProducto, [target.name]: target.value });
  };

  useEffect(() => {
    actions.getProducts();
  }, []);
  console.log(store.productos);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(clienteProducto, store.usuario.own_agency.id);
    actions.postProducts(clienteProducto);
    setClienteProducto({
      product: "",
      amount: "",
      date_of_closing: "",
      payment_recurrence: "",
      notes: "",
    });
    handleClose();
    toast.success("Registraste el producto correctamente");
    actions.getProducts();
  };

  return (
    <>
      <button
        className="btn btn-light rounded-pill ms-2 border w-25-dark fw-bold text-white"
        style={{ background: "#695cfe" }}
        onClick={handleShow}
      >
        <i className="fa-solid fa-folder-plus"></i>
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Registra el producto para: </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Producto*</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="product"
                    value={clienteProducto.product}
                    onChange={handleForm}
                    required
                  >
                    <option
                      className="text-center"
                      style={{ backgroundColor: "white" }}
                      value="white"
                    ></option>
                    {store.productos.length > 0 ? (
                      store.productos.map((producto) => (
                        <option
                          key={producto.id}
                          className="text-center"
                          style={{ backgroundColor: "white" }}
                          value="white"
                        >
                          <span>{producto.product_name}</span>
                        </option>
                      ))
                    ) : (
                      <option
                        className="text-center"
                        style={{ backgroundColor: "white" }}
                        value="white"
                      >
                        No hay productos guardados
                      </option>
                    )}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Fecha de cierre*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Fredom 20"
                    autoFocus
                    name="product_name"
                    value={clienteProducto.date_of_closing}
                    onChange={handleForm}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Monto*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Seguro de Vida"
                    autoFocus
                    name="product_type"
                    value={clienteProducto.amount}
                    onChange={handleForm}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Frecuencia de pago*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Seguro de Vida"
                    autoFocus
                    name="product_type"
                    value={clienteProducto.payment_recurrence}
                    onChange={handleForm}
                    required
                  />
                </Col>
              </Row>

              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="product_description"
                maxLength="1000"
                value={clienteProducto.product_description}
                onChange={handleForm}
              />
            </Form.Group>
            <span className="fw-bolder">* Campos requeridos</span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default CreateProductClient;
