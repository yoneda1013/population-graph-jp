import React from 'react';
import { PopulationData } from './App';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';


type PopulationChartProps = {
  selectedPrefPopulation: PopulationData[];
};

export default function PopulationChart({selectedPrefPopulation}: PopulationChartProps) {

  //selectedPrefPopulationのデータをLineChart用に変換する処理
  // const data = selectedPrefPopulation.map((PopulationData: PopulationData) => {
  //   let prefCode = PopulationData.prefCode;
  //   let prefPopulation = PopulationData.result.data[0].data;

    
    
  //   return {
  //     [
  //         {
  //           "year": "2020",
  //           "hokkaido": 4000,
  //           "fukushima": 2400,
  //           "nara": 2400
  //         }
  //       ]
  //   };
  // });

  // returnしたいのは下記のようなデータ
  const data = [
    {
      "year": "2000",
      // "hokkaido": 10000,
      // "fukushima": 2400,
      // "nara": 2600
    },
    {
      "year": "2020",
      // "hokkaido": 4000,
      // "fukushima": 2400,
      // "nara": 2400
    }
  ]
  console.log(data, "data at Chart", selectedPrefPopulation);
  
  return (
    <LineChart width={400} height={250} data={data}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis {...selectedPrefPopulation.length == 0 && { ticks: [0, 5000] }}/>
      <Tooltip />
      <Legend />
      {/* <Line type="monotone" dataKey="hokkaido" stroke="#8884d8" />
      <Line type="monotone" dataKey="nara" stroke="#8884d8" />
      <Line type="monotone" dataKey="fukushima" stroke="#8884d8" /> */}
    </LineChart>
  );
}
