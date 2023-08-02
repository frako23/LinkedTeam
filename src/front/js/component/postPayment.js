import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Swal from "sweetalert2";

function postPayment() {
  const [show, setShow] = useState(false);
  const { store, actions } = useContext(Context);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [agency, setAgency] = useState({
    name: "",
    company: "",
    companyId: 0,
  });
  const handleForm = ({ target }) => {
    setAgency({ ...agency, [target.name]: target.value });
  };

  useEffect(() => {
    actions.getCompany();
  }, []);

  console.log(store.company);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(agency);
    actions.postAgencies(agency);
    setAgency({
      name: "",
      company: "",
      companyId: 0,
    });
    handleClose();
    Swal.fire({
      title: "Haz registrado tu pago correctamente 👌",
      confirmButtonText: "OK",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Crear Agencia
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Registra tu pago</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Forma de pago</Form.Label>
              <InputGroup className="mt-3">
                <DropdownButton
                  variant="outline-secondary"
                  title={agency.company == "" ? "Company" : agency.company}
                  id="input-group-dropdown-1"
                >
                  {store.company.map((com, index) => (
                    <Dropdown.Item
                      href="#"
                      key={index}
                      name="company"
                      onClick={() =>
                        setAgency({
                          ...agency,
                          company: com.name,
                          companyId: com.id,
                        })
                      }
                      value={agency.company}
                    >
                      {com.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </InputGroup>
              <Form.Label>Monto del pago</Form.Label>
              <Form.Control
                type="number"
                placeholder="KGC Group"
                autoFocus
                name="name"
                value={agency.name}
                onChange={handleForm}
              />
              <Form.Label>Fecha del pago</Form.Label>
              <Form.Control
                type="date"
                placeholder="KGC Group"
                autoFocus
                name="name"
                value={agency.name}
                onChange={handleForm}
              />
              <Form.Label>Número de referencia</Form.Label>
              <Form.Control
                type="text"
                placeholder="KGC Group"
                autoFocus
                name="name"
                value={agency.name}
                onChange={handleForm}
              />
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                maxLength="1000"
                value={courses.description}
                onChange={handleForm}
              />
            </Form.Group>
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

export default postPayment;
