import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";

import { PricingCard } from "../components/payment/pricingCard";

export const Pricing = () => {
  const { actions } = useContext(Context);
  useEffect(() => {
    actions.setHeader("Registra tu pago");
  }, []);
  return (
    <>
      <h1
        className="text-white text-center mt-4 kanban-head-title"
        style={{ paddingBottom: "2rem" }}
      >
        Renueva tu suscripción
      </h1>
      <PricingCard />
    </>
  );
};
