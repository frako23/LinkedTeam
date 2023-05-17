import React from "react";
import "../../styles/perfil.css";
import GaugeChart from 'react-gauge-chart'
import "../../styles/perfil.css"

export const FuelChart = () => {
    return (
      <>
        <div className="fuel-div">
          <GaugeChart id="gauge-chart5"
            nrOfLevels={420}
            arcsLength={[0.3, 0.5, 0.2]}
            colors={['#EA4228', '#F5CD19', '#5BE12C']}
            percent={0.37}
            arcPadding={0.02}
            />
            <h4 className="fuel-tag">Conversión de ventas</h4>
        </div>
        <div className="fuel-div">
          <GaugeChart id="gauge-chart5"
            nrOfLevels={420}
            arcsLength={[0.3, 0.5, 0.2]}
            colors={['#EA4228', '#F5CD19', '#5BE12C']}
            percent={0.37}
            arcPadding={0.02}
            />
            <h4 className="fuel-tag">Meta de ventas</h4>
        </div>
        <div className="fuel-div">
          <GaugeChart id="gauge-chart5"
            nrOfLevels={420}
            arcsLength={[0.3, 0.5, 0.2]}
            colors={['#EA4228', '#F5CD19', '#5BE12C']}
            percent={0.37}
            arcPadding={0.02}
            />
            <h4 className="fuel-tag">Meta de reclutamiento</h4>
        </div>
        </>
    )
}