import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Link } from "react-router-dom";
import { Nuevonegocio } from "../components/crm/nuevoNegocio";
import { Pricing } from "./pricing";
import { ExportToExcel } from "../components/crm/exportToExcel";
import SortCRM from "../components/crm/sortCRM";
import { ImportFromExcel } from "../components/crm/importFromExcel";
import { Kanban } from "../components/CRM/kanban";
import { useNavigate } from "react-router-dom";

export const SalesFunnel = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.setHeader("Embudo de ventas");
  }, []);

  useEffect(() => {
    if (store.usuario.status === "inactive") {
      navigate("/pricing");
    }
  }, [store.usuario.status]);

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
      {store.usuario.status === "inactive" ? (
        <Pricing />
      ) : (
        <div className=" ps-5 clients">
          <div className="ms-2 d-flex justify-content-between pt-2">
            <div className="btn-group me-2 ms-5">
              <Nuevonegocio />
              <ExportToExcel excelData={store.clientes} />
              <ImportFromExcel />
              {store.usuario.role === "manager" ? (
                <Link
                  to="/dashboardAsociado"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Asociados
                </Link>
              ) : (
                ""
              )}
              {/* <table className="table t-summary">
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
              </table> */}
            </div>
          </div>
          <div className="form-outline mb-4 mx-5">
            <SortCRM />
          </div>
          <Kanban />
        </div>
      )}
    </>
  );
};
