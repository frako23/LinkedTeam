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

  let notClosedArray = store.userClients.filter(
    (index) => index.estatus != "Cerrado"
  );

  console.log(notClosedArray);

  let amountSum = notClosedArray.reduce(
    (acum, index) => acum + parseInt(index.monto),
    0
  );

  console.log(amountSum);

  let closedArray = store.userClients.filter(
    (index) => index.estatus == "Cerrado"
  );

  console.log(closedArray);

  let amountSumClosedSales = closedArray.reduce(
    (acum, index) => acum + parseInt(index.monto),
    0
  );

  console.log(amountSumClosedSales);

  useEffect(() => {
    if (store.usuario.role === "manager") {
      actions.getUsersByAgency(store.usuario.own_agency);
    }
  }, []);

  console.log(store.usuario.own_agency);

  return (
    <>
      <Navbar />
      <div className=" ps-5">
        <div className="d-flex justify-content-center">
          <div className="kanban-head">
            {["Secondary"].map((variant) => (
              <DropdownButton
                // as={ButtonGroup}
                key={variant}
                id={`dropdown-variants-${variant}`}
                variant={variant.toLowerCase()}
                title="Asociados"
                style={{
                  marginTop: "3rem",
                  right: "34rem",
                  position: "relative",
                  marginRight: "-8rem",
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
            {selected}
          </span>

          <div className="position-absolute top-0 end-0 text-center">
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
          </div>
        </div>

        <KanbanAsociado />
      </div>
    </>
  );
};
