import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Nuevonegocio } from "../component/nuevoNegocio";
import { Tarjetacliente } from "../component/tarjetaCliente";
import { Kanban } from "../component/kanban";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Pricing } from "./pricing";
import { ExportToExcel } from "../component/exportToExcel";
import SortCRM from "../component/sortCRM";
import { ImportFromExcel } from "../component/importFromExcel";

export const Dashboard = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (store.usuario.status === "inactive") {
  //     navigate("/pricing");
  //   }
  // }, [store.usuario.status]);

  let notClosedArray = store.clientes.filter(
    (index) => index.status != "Cerrado"
  );

  // console.log(notClosedArray);

  let amountSum = notClosedArray.reduce(
    (acum, index) => acum + parseInt(index.amount),
    0
  );

  // console.log(amountSum);

  let closedArray = store.clientes.filter((index) => index.status == "Cerrado");

  // console.log(closedArray);

  let amountSumClosedSales = closedArray.reduce(
    (acum, index) => acum + parseInt(index.amount),
    0
  );

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientes();
    }
  }, [store.token]);

  useEffect(() => {
    if (store.usuario.role === "manager") {
      actions.getUsersByAgency(store.usuario.own_agency);
    }
  }, []);

  // console.log(store.client);

  return (
    <>
      <Navbar />
      {store.usuario.status === "inactive" ? (
        <Pricing />
      ) : (
        <div className=" ps-5">
          <div className="d-flex justify-content-center">
            {store.usuario.role === "manager" ? (
              <Link
                to="/dashboardAsociado"
                className="coolbtn"
                style={{
                  marginTop: "2.5rem",
                  right: "34rem",
                  position: "relative",
                  marginRight: "-8rem",
                }}
              >
                Asociados
              </Link>
            ) : (
              ""
            )}
            <div className="kanban-head">
              <strong className="kanban-head-title mt-4">CRM</strong>
            </div>
          </div>
          <div className="ms-2 d-flex justify-content-between">
            <div className="box-dashboard ms-5">
              <Nuevonegocio />
              <ExportToExcel excelData={store.clientes} />
              <ImportFromExcel />
            </div>
            <SortCRM />
            <div className="top-0 end-0 text-center d-grid me-5 ms-5">
              <div
                className="btn-group pe-5"
                role="group"
                aria-label="Basic mixed styles example"
              >
                <table className="table t-summary">
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
                <table className="table t-summary">
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

          <Kanban />
        </div>
      )}
    </>
  );
};
