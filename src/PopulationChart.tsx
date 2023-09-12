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
import { PopulationChartProps } from './App';
import { usePopulationChart } from './usePopulationChart';

export default function PopulationChart({selectedPrefPopulation}: PopulationChartProps) {
  const { dataChart, onTypeCheck, colorMap} = usePopulationChart({selectedPrefPopulation});
  
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
          <Line type="monotone" dataKey={PopulationData.prefName} stroke={colorMap[PopulationData.prefName]}  key={PopulationData.prefName} />
        ))}
      </LineChart>
    </>
  );
}
