import './App.css';
import PrefectureSelector from './PrefectureSelector';
import PopulationChart from './PopulationChart';

import { useDataFetch, usePrefPopulationFetch } from './useDataFetch';

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PopulationData = {
  message: null | string,
  result: {
    boundaryYear: number,
    data: {
      label: string,
      data: {
        year: number,
        value: number,
        rate?: number,
      }[],
    }[],
  },
  prefCode: number,
  prefName: string,
};

export type ApiData = {
  message: null | string,
  result: Prefecture[],
};

export type PopulationChartProps = {
  selectedPrefPopulation: PopulationData[];
};

function App() {
  const {data, isLoading} = useDataFetch();
  const {selectedPrefPopulation ,handlePrefCheck} = usePrefPopulationFetch();
  //JSXが扱われているファイルの場合はtsxにする。扱われていないファイル、例えばカスタムフックなどだとtsになる。テストファイルにおいてもJSXを扱う場合は、tsxにする。
  //tsファイルでjsx書くとコンパイルで落ちる

  return (
    <div>
      <header>
        <h1>都道府県別の総人口推移グラフ</h1>
      </header>
      <main>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <PrefectureSelector data={data} onPrefCheck={handlePrefCheck}/>
        )}
        <PopulationChart selectedPrefPopulation={selectedPrefPopulation}/>
      </main>
    </div>
  );
}

export default App;
