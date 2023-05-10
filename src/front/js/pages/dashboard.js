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

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientes();
    }
  }, [store.token]);

  return (
    <div className="pagina" style={{ height: "100vh" }}>
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
              class="btn-group pe-5"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button type="button" class="btn btn-warning fw-bold">
                En Calle= $20.054
              </button>
              <button type="button" class="btn btn-success fw-bold">
                Logrado= $15.024/75%
              </button>
              <button type="button" class="btn btn-primary fw-bold">
                Negocios= 15
              </button>
            </div>
          </div>
        </div>

        <Kanban />
      </div>
    </div>
  );
};
