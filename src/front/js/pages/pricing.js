import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { PricingCard } from "../component/pricingCard";

export const Pricing = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const redirection = () => {
    navigate("/video");
  };

  return (
    <div style={{minHeight: "100vh"}}>
      <Navbar />
      
        <h1
          className="text-white text-center mt-4 kanban-head-title"
          style={{ paddingBottom: "2rem" }}
        >
          Renueva tu suscripción
        </h1>
        <PricingCard />
      
    </div>
  );
};
