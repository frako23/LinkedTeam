import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { Col, Row } from "react-bootstrap";

function CreateProduct() {
  const [show, setShow] = useState(false);
  const { actions } = useContext(Context);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [products, setProducts] = useState({
    company: "",
    product_name: "",
    product_type: "",
    product_description: "",
  });
  const id = sessionStorage.getItem("usuario.id");
  const handleForm = ({ target }) => {
    setProducts({ ...products, [target.name]: target.value });
  };

  useEffect(() => {
    actions.getCourses();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(products, store.usuario.own_agency.id);
    actions.postCourses(products, id);
    setProducts({
      company: "",
      product_name: "",
      product_type: "",
      product_description: "",
    });
    handleClose();
    toast.success("Registraste el product correctamente");
    actions.getCourses();
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Agregar producto
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Crea tu producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Empresa*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="CICA LIFE, Best Doctor, VUMI..."
                    autoFocus
                    name="company"
                    value={products.company}
                    onChange={handleForm}
                  />
                </Col>
                <Col>
                  <Form.Label>Nombre de la póliza*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Fredom 20"
                    autoFocus
                    name="product_name"
                    value={products.product_name}
                    onChange={handleForm}
                  />
                </Col>
                <Col>
                  <Form.Label>Tipo de póliza*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Seguro de Vida"
                    autoFocus
                    name="product_type"
                    value={products.product_type}
                    onChange={handleForm}
                  />
                </Col>
              </Row>

              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="product_description"
                maxLength="1000"
                value={products.product_description}
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

export default CreateProduct;
