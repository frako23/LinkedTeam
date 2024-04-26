import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/newuserpannel.css";
import { useNavigate } from "react-router-dom";
import { CreateClient } from "../components/clients/CreateClient";
export const Clients = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    actions.setHeader("Clientes");
  }, []);
  useEffect(() => {
    if (store.usuario.status === "inactive") {
      navigate("/pricing");
    }
  }, [store.usuario.status]);

  return (
    <>
      <div className="create-course-heading">
        <CreateClient />
        <h3>Haz click aqui para añadir un cliente</h3>
      </div>

      <section className="clients">
        <table className="table table-hover clients-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};
