import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";
import GaugeChart from "react-gauge-chart";
import "../../styles/perfil.css";

export const FuelChart = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => actions.getClientes(), []);
  console.log(store.usuario.sales_goal, store.closedSales);

  let percent = store.closedSales / store.usuario.sales_goal;
  console.log(percent);
  return (
    <div className="fuel-div">
      <GaugeChart
        id="gauge-chart5"
        nrOfLevels={600}
        arcsLength={[0.3, 0.4, 0.3]}
        colors={["#EA4228", "#F5CD19", "#5BE12C"]}
        percent={percent}
        arcPadding={0.0}
      />
      <h4 className="fuel-tag">Meta de ventas</h4>
    </div>
  );
};
