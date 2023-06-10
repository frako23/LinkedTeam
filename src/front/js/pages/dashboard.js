import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Nuevonegocio } from "../component/nuevoNegocio";
import { Tarjetacliente } from "../component/tarjetaCliente";
import { Kanban } from "../component/kanban";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const Dashboard = () => {
  const { store, actions } = useContext(Context);

  let notClosedArray = store.clientes.filter((index) => index.estatus != "Cerrado")

  console.log(notClosedArray);

  let amountSum = notClosedArray.reduce(
    (acum, index) => acum + parseInt(index.monto),
    0
  );

  console.log(amountSum);

  let closedArray = store.clientes.filter((index) => index.estatus == "Cerrado")

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

console.log(store.client);

  return (
    <div style={{minHeight: "100vh"}}>
      {/* barra de menu */}

      <Navbar />

      <div className=" ps-5">
        <div className="d-flex justify-content-center">
          { store.usuario.role === "manager" ?
            ['Secondary'].map(
            (variant) => (
              <DropdownButton
                // as={ButtonGroup}
                key={variant}
                id={`dropdown-variants-${variant}`}
                variant={variant.toLowerCase()}
                title="Asociados"              
                style={{
                  marginTop: "3rem",
                  right: "34rem",
                  position: "relative"
              }}
              >
                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3" active>
                  Active Item
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
              </DropdownButton>
            ),
            ) : ""
          }
            <div className="kanban-head">
              <strong className="kanban-head-title mt-4">CRM</strong>
            </div>
          </div>
        <div className="ms-2 d-flex position-relative mb-3 ">
          <Nuevonegocio />;
          <div className="position-absolute top-0 end-0 text-center">
            <div
              className="btn-group pe-5"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <table className="table-color-not-closed">
                <tr className="">
                  <td className="">
                En la calle  
                  </td>
                  <td className="">
                    ${amountSum} 
                  </td>
                </tr>
                <tr className="">
                  <td className="">
                Negocios 
                  </td>
                  <td className="">
                  {notClosedArray.length}
                  </td>
                </tr>
              </table>
              <table className="ms-2 table-color-closed">
                <tr className="">
                  <td className="">
                  Logrado 
                  </td>
                  <td className="">
                  ${amountSumClosedSales} 
                  </td>
                </tr>
                <tr className="">
                  <td className="">
                Negocios 
                  </td>
                  <td className="">
                  {closedArray.length}
                  </td>
                </tr>
              </table>
              
            </div>
          </div>
        </div>

        <Kanban />
      </div>
    </div>
  );
};
