import React from "react";
import "../../styles/perfil.css";
import GaugeChart from 'react-gauge-chart'

export const FuelChart = () => {
    return (
        <>
        <GaugeChart id="gauge-chart1" />
        <GaugeChart id="gauge-chart2" 
        nrOfLevels={20} 
        percent={0.86} 
        />
        <GaugeChart id="gauge-chart4" 
  nrOfLevels={10} 
  arcPadding={0.1} 
  cornerRadius={3} 
  percent={0.6} 
/>
<GaugeChart id="gauge-chart5"
  nrOfLevels={420}
  arcsLength={[0.3, 0.5, 0.2]}
  colors={['#5BE12C', '#F5CD19', '#EA4228']}
  percent={0.37}
  arcPadding={0.02}
/>
<GaugeChart id="gauge-chart6" 
  animate={false} 
  nrOfLevels={15} 
  percent={0.56} 
  needleColor="#345243" 
/>
        </>
    )
}