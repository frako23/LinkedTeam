import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Nuevonegocio } from "../component/nuevoNegocio";
import { KanbanAsociado } from "../component/kanbanAsociado";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export const DashboardAsociado = () => {
  const { store, actions } = useContext(Context);
  const [selected, setSelected] = useState("");
  const [agency, setAgency] = useState("");

  let notClosedArray = store.userClients.filter(
    (index) => index.status != "Cerrado"
  );

  console.log(notClosedArray);

  let amountSum = notClosedArray.reduce(
    (acum, index) => acum + parseInt(index.amount),
    0
  );

  console.log(amountSum);

  let closedArray = store.userClients.filter(
    (index) => index.status == "Cerrado"
  );

  console.log(closedArray);

  let amountSumClosedSales = closedArray.reduce(
    (acum, index) => acum + parseInt(index.amount),
    0
  );

  console.log(amountSumClosedSales);

  useEffect(() => {
    if (store.usuario.role === "manager") {
      actions.getAgenciesId();
      actions.getUsersByAgency(store.usuario.own_agency.id);
    }
  }, []);

  console.log(store.usuario.own_agency);
  console.log(store.own_agencies);
  console.log(store.userClients);

  return (
    <>
      <Navbar />
      <div className=" ps-5">
        <div className="d-flex" style={{ marginLeft: "4rem" }}>
          <div className="kanban-head">
            <div className="d-flex ">
              {["Warning"].map((variant) => (
                <DropdownButton
                  // as={ButtonGroup}
                  key={variant}
                  id={`dropdown-variants-${variant}`}
                  variant={variant.toLowerCase()}
                  title="Agencias Directas"
                  style={{
                    marginTop: "3rem",
                    right: "2rem",
                    // position: "relative",
                    // marginRight: "-8rem",
                  }}
                >
                  {store.own_agencies.map((agencia) => (
                    <Dropdown.Item
                      eventKey="1"
                      key={agencia.id}
                      onClick={(e) => {
                        actions.getUsersByAgency(agencia.id);
                        setAgency(agencia.name);
                      }}
                    >
                      {agencia.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              ))}
              {["Danger"].map((variant) => (
                <DropdownButton
                  // as={ButtonGroup}
                  key={variant}
                  id={`dropdown-variants-${variant}`}
                  variant={variant.toLowerCase()}
                  title="Asociados"
                  style={{
                    marginTop: "3rem",
                    right: "0rem",
                    // position: "relative",
                    // marginRight: "-8rem",
                  }}
                >
                  {store.usersByAgency.map((asociado) => (
                    <Dropdown.Item
                      eventKey="1"
                      key={asociado.id}
                      onClick={(e) => {
                        actions.getUserClients(asociado.id);
                        setSelected(asociado.name);
                      }}
                    >
                      {asociado.name + " " + asociado.lastname}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              ))}

              <button
                className="btn btn-info"
                style={{
                  height: "2.5rem",
                  marginTop: "3rem",
                  marginLeft: "2rem",
                }}
                onClick={() => {
                  actions.getUsersByAgency(store.usuario.own_agency.id);
                  setAgency("");
                  setSelected("");
                }}
              >
                Volver a asociados directos
              </button>
            </div>
            <strong className="kanban-head-title mt-4">CRM</strong>
          </div>
        </div>
        <div className="ms-2 d-flex position-relative mb-3 ">
          <span
            className="fw-bold"
            style={{
              marginLeft: "3rem",
              color: "rgb(167, 100, 255)",
              fontSize: "2rem",
            }}
          >
            {agency + " " + selected}
          </span>

          <div className="position-absolute top-0 end-0 text-center">
            {selected !== "" ? (
              <div
                className="btn-group pe-5"
                role="group"
                aria-label="Basic mixed styles example"
              >
                <table className="table-color-not-closed">
                  <tbody>
                    <tr className="">
                      <td className="">En la calle</td>
                      <td className="">${amountSum}</td>
                    </tr>
                    <tr className="">
                      <td className="">Negocios</td>
                      <td className="">{notClosedArray.length}</td>
                    </tr>
                  </tbody>
                </table>
                <table className="ms-2 table-color-closed">
                  <tbody>
                    <tr className="">
                      <td className="">Logrado</td>
                      <td className="">${amountSumClosedSales}</td>
                    </tr>
                    <tr className="">
                      <td className="">Negocios</td>
                      <td className="">{closedArray.length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <KanbanAsociado />
      </div>
    </>
  );
};
