import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";

export const Box = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientes();
    }
  }, [store.token]);
  return (
    <div className="main__card">
      <div className="card__profile">
        <div className="card__inner ">
          <p className="text-primary">PROSPECTOS</p>
        </div>
        <p className="text-primary font-weight-bold numero">
          {
            store.clientes.filter((index) => index.estatus == "Prospecto")
              .length
          }
        </p>
      </div>

      <div className="card__profile">
        <div className="card__inner">
          <p className="text-primary">CONTACTADOS</p>
        </div>
        <span className="text-primary font-weight-bold numero">
          {
            store.clientes.filter((index) => index.estatus == "Contactado")
              .length
          }
        </span>
      </div>

      <div className="card__profile">
        <div className="card__inner">
          <p className="text-primary">PRIMERA CITA</p>
        </div>
        <span className="text-primary font-weight-bold numero">
          {
            store.clientes.filter(
              (index) => index.estatus == "Primera Cita"
            ).length
          }
        </span>
      </div>

      <div className="card__profile">
        <div className="card__inner">
          <p className="text-primary">NEGOCIACIÓN</p>
        </div>
        <span className="text-primary font-weight-bold numero">
          {
            store.clientes.filter(
              (index) => index.estatus == "Negociación"
            ).length
          }
        </span>
      </div>

      <div className="card__profile">
        <div className="card__inner">
          <p className="text-primary">CIERRES</p>
        </div>
        <span className="text-primary font-weight-bold numero">
          {
            store.clientes.filter((index) => index.estatus == "Cerrado")
              .length
          }
        </span>
      </div>
    </div>
  );
};
