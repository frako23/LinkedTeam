import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { AgencyCard } from "../component/agencyCard";

export const AgencyToSelect = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const redirection = () => {
    navigate("/video");
  };

  return (
    <>
    <Navbar />
        <h1
          className="text-white text-center mt-4 kanban-head-title"
          style={{ paddingBottom: "3rem" }}
        >
          Selecciona la agencia a la que perteneces
        </h1>
        <AgencyCard />
      
    </>
  );
};
