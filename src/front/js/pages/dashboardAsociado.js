import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { KanbanAsociado } from "../components/crm/kanbanAsociado";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { ExportToExcel } from "../components/crm/exportToExcel";
import SortCRMAsociados from "../components/crm/sortCRMAsociados";

export const DashboardAsociado = () => {
  const { store, actions } = useContext(Context);
  const [selected, setSelected] = useState("");
  const [agency, setAgency] = useState("");
  const [asociadoId, setAsociadoId] = useState("");

  useEffect(() => {
    actions.setHeader("CRM Asociados");
  }, []);

  let notClosedArray = store.userClients.filter(
    (index) => index.status != "Cerrado"
  );

  // console.log(notClosedArray);

  let amountSum = notClosedArray.reduce(
    (acum, index) => acum + parseInt(index.amount),
    0
  );

  // console.log(amountSum);

  let closedArray = store.userClients.filter(
    (index) => index.status == "Cerrado"
  );

  // console.log(closedArray);

  let amountSumClosedSales = closedArray.reduce(
    (acum, index) => acum + parseInt(index.amount),
    0
  );

  // console.log(amountSumClosedSales);

  useEffect(() => {
    if (store.usuario.role === "manager") {
      actions.getAgenciesId();
      actions.getUsersByAgency(store.usuario.own_agency.id);
    }
  }, []);

  // console.log(store.usuario.own_agency);
  // console.log(store.own_agencies);
  // console.log(store.userClients);

  return (
    <>
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
                      onClick={() => {
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
                      onClick={() => {
                        actions.getUserClients(asociado.id);
                        setSelected(asociado.name + " " + asociado.lastname);
                        setAsociadoId(asociado.id);
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
        <div className="ms-2 d-flex justify-content-evenly">
          <div
            className="fw-bold"
            style={{
              marginLeft: "3rem",
              color: "rgb(167, 100, 255)",
              fontSize: "2rem",
            }}
          >
            <span>{agency}</span>
            <br />
            <span>{selected}</span>
          </div>

          <ExportToExcel excelData={store.userClients} />

          <SortCRMAsociados id={asociadoId} />
          <div className="top-0 end-0 text-center d-grid me-5 ms-5">
            <div
              className="btn-group pe-5"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th>En la calle</th>
                    <th>Negocios</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-light">
                    <td className="" style={{ color: "black" }}>
                      ${amountSum}
                    </td>
                    <td className="" style={{ color: "black" }}>
                      {notClosedArray.length}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className="btn-group pe-5"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th>Logrado</th>
                    <th>Negocios</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-light">
                    <td className="" style={{ color: "black" }}>
                      ${amountSumClosedSales}
                    </td>
                    <td className="" style={{ color: "black" }}>
                      {closedArray.length}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <KanbanAsociado />
      </div>
    </>
  );
};
