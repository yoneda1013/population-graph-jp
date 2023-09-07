import { useState } from 'react';
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
  const [selectedType, setSelectedType] = useState<number>(0);
  const dataChart: { year: number; [key: string]: unknown }[]  = [
    {
      "year": 1960,
    },
    {
      "year": 1965,
    },
    {
      "year": 1970,
    },
    {
      "year": 1975,
    },
    {
      "year": 1980,
    },
    {
      "year": 1985
    },
    {
      "year": 1990
    },
    {
      "year": 1995
    },
    {
      "year": 2000
    },
    {
      "year": 2005
    },
    {
      "year": 2010
    },
    {
      "year": 2015
    },
    {
      "year": 2020
    }, 
    {
      "year": 2025
    },
    {
      "year": 2030
    },
    {
      "year": 2035
    },
    {
      "year": 2040
    },
    {
      "year": 2045
    }
];

const onTypeCheck = (checked: boolean, value: string) => {
  if(value == "totalPopulation"){
    setSelectedType(0);
  }
  if(value == "youngPopulation"){
    setSelectedType(1);
  }
  if(value == "productiveAgePopulation"){
    setSelectedType(2);
  }
  if(value == "elderlyPopulation"){
    setSelectedType(3);
  }
}

  selectedPrefPopulation.map((PopulationData: PopulationData) => {    
    const data = PopulationData.result.data[selectedType].data;
    for (let i = 0; i <= 17; i++) {
    if (data[i].year === dataChart[i].year) {
      dataChart[i][PopulationData.prefName] = data[i].value;
    }
  }
  });  

  return (
    <>
    <input type="radio" name="populationType" value="totalPopulation" onChange={e => onTypeCheck(e.target.checked, e.target.value )}/>
    <label >総人口</label>
    <input type="radio" name="populationType" value="youngPopulation" onChange={e => onTypeCheck(e.target.checked, e.target.value )}/>
    <label >年少人口</label>
    <input type="radio" name="populationType" value="productiveAgePopulation" onChange={e => onTypeCheck(e.target.checked, e.target.value )}/>
    <label >生産年齢人口</label>
    <input type="radio" name="populationType" value="elderlyPopulation" onChange={e => onTypeCheck(e.target.checked, e.target.value )}/>
    <label >老年人口</label>
    <LineChart width={800} height={250} data={dataChart}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis {...selectedPrefPopulation.length == 0 && { ticks: [0, 5000] }}/>
      <Tooltip />
      <Legend />
      {selectedPrefPopulation.map((PopulationData: PopulationData) => (
        <Line type="monotone" dataKey={PopulationData.prefName} stroke="#8884d8"  key={PopulationData.prefName} />
      ))}
    </LineChart>
    </>
  );
}
