import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/perfil.css";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import { Box } from "../component/box";
import { AdminPannel } from "../component/adminPannel";
import { UserPannel } from "../component/userPannel";

export const Perfil = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getUsuario();
    // actions.getClientes();
    // actions.closedArray();
    // actions.amountSumClosed();
  }, []);

  useEffect(() => {
    // actions.getUsuario();
    actions.getClientes();
    actions.closedArray();
    actions.amountSumClosed();
  }, [store.clientes.length]);

  useEffect(() => {
    if (store.usuario.status === "inactive") {
      navigate("/pricing");
    }
  }, [store.usuario.status]);

  return (
    <>
      <Navbar />
      {/* pagina */}
      {store.usuario.role === "admin" ? <AdminPannel /> : <UserPannel />}
    </>
  );
};
