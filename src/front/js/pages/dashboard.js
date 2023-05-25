import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Nuevonegocio } from "../component/nuevoNegocio";
import { Tarjetacliente } from "../component/tarjetaCliente";
import { Kanban } from "../component/kanban";

export const Dashboard = () => {
  const { store, actions } = useContext(Context);

  let notClosedArray = store.clientes.filter((index) => index.estatus != "Venta Concretada")

  console.log(notClosedArray);

  let amountSum = notClosedArray.reduce(
    (acum, index) => acum + parseInt(index.monto),
    0
  );

  console.log(amountSum);

  let closedArray = store.clientes.filter((index) => index.estatus == "Venta Concretada")

  console.log(closedArray);

  let amountSumClosedSales = closedArray.reduce(
    (acum, index) => acum + parseInt(index.monto),
    0
  );

  console.log(amountSumClosedSales);

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientes();
    }
  }, [store.token]);

  return (
    <div className="pagina">
      {/* barra de menu */}

      <Navbar />

      <div className="pagina ps-5">
        <div className="kanban-head">
          <strong className="kanban-head-title mt-4">CRM</strong>
        </div>
        <div className="ms-2 d-flex position-relative mb-3 ">
          <Nuevonegocio />;
          <div className="position-absolute top-0 end-0 text-center">
            <div
              className="btn-group pe-5"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button type="button" className="btn btn-warning fw-bold">
                En Calle= ${amountSum} 
                Negocios= {notClosedArray.length}
              </button>
              <button type="button" className="btn btn-success fw-bold">
                Logrado= ${amountSumClosedSales}
                Negocios= {closedArray.length}
              </button>
            </div>
          </div>
        </div>

        <Kanban />
      </div>
    </div>
  );
};
