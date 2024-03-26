import React from "react";
import "../../styles/dashboard.css";

import { PricingCard } from "../components/payment/pricingCard";

export const Pricing = () => {
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
