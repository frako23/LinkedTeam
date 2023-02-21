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
    <div className="d-flex">
      {/* barra de menu */}

      <Navbar />

      <div className="pagina">
        <div className="kanban-head">
          <strong className="kanban-head-title">CRM</strong>
        </div>
        <div className="ms-2 d-flex position-relative mb-3">
          <Nuevonegocio />;
          <div className="texto text-center">
            <table
              className="table table-bordered text-white position-absolute top-0 end-0"
              style={{
                width: 600,
              }}
            >
              <thead>
                <tr>
                  <th scope="col">En Calle= $20.054</th>
                  <th scope="col">Logrado= $15.024/75%</th>
                  <th scope="col">Negocios= 15</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>

        <Kanban />
      </div>
    </div>
  );
};
