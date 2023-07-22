import React, { useEffect, useState } from 'react';
import './App.css';
import PrefectureSelector from './PrefectureSelector';
import PopulationChart from './PopulationChart';
import axios,{ AxiosResponse } from 'axios';
import { log } from 'console';


export type Prefecture = {
  prefCode: number;
  prefName: string;
};

function App() {
  type ApiData = {
    message: string | null;
    result: Prefecture[];
  };

  const [data, setData] = useState<ApiData>({ message: null, result: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([]);
  //都道府県別人口データの状態を管理するstateを作成する。
  const [selectedPrefPopulation, setSelectedPrefPopulation] = useState<number[]>([]);

  console.log(selectedPrefPopulation, "selectedPrefPopulation");

  const handlePrefCheck = (checked: boolean, prefCode: number) => {
    setSelectedPrefCodes(prev => {
      if (checked) {
        return [...prev, prefCode];
      } else {
        return prev.filter(code => code !== prefCode);
      }
    });

    const getData = async (): Promise<void> => {
        try {
          const res: AxiosResponse = await axios.get('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear', {
            headers: { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY },
            params: {
              prefCode: prefCode,
              cityCode: '-',
            },
          });
          setSelectedPrefPopulation(prev => [...prev, res.data]);
        } catch (err) {
          console.error(`Error for prefCode ${prefCode}: `, err);
        }
    };
    
    getData();
    //取得したデータをPopulationChartコンポーネントに渡す。
  };

  useEffect(() => {
    axios
      .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY },
      })
      .then((res) => {
        setData(res.data);
        setIsLoading(false); // データ取得後、ローディング状態をfalseに設定
      })
      .catch((err) => {
        console.error('Error:', err);
        setIsLoading(false); // エラーが発生した場合でもローディング状態をfalseに設定
      });
  }, []);
  console.log(data);

  return (
    <div>
      <header>
        <h1>都道府県別の総人口推移グラフ</h1>
      </header>
      <main>
        {isLoading ? (
          <div>Loading...</div> // データ取得中はローディングメッセージを表示
        ) : (
          <PrefectureSelector data={data} onPrefCheck={handlePrefCheck}/> // データ取得後、PrefectureSelectorコンポーネントを表示
        )}
        <PopulationChart />
      </main>
    </div>
  );
}

export default App;
