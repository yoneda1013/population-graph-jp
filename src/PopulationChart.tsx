import React from 'react';
import { PopulationData } from './App';

type PopulationChartProps = {
  selectedPrefPopulation: PopulationData[];
};

export default function PopulationChart({selectedPrefPopulation}: PopulationChartProps) {
  return (
    <div>
      <p>PopulationChart</p>
      {selectedPrefPopulation.map((data: PopulationData) => (
        <div key={data.prefCode}>
          <h3>{data.prefCode}</h3>
        </div>
      ))}
    </div>
  );
}
