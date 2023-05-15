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

  let amountSum = store.clientes.reduce(
    (acum, index) => acum + parseInt(index.monto),
    0
  );
  console.log(amountSum);

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
          <strong className="kanban-head-title">CRM</strong>
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
              </button>
              <button type="button" className="btn btn-success fw-bold">
                Logrado= $15.024/75%
              </button>
              <button type="button" className="btn btn-primary fw-bold">
                Negocios= {store.clientes.length}
              </button>
            </div>
          </div>
        </div>

        <Kanban />
      </div>
    </div>
  );
};
