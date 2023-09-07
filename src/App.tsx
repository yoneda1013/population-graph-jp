import { useEffect, useState } from 'react';
import './App.css';
import PrefectureSelector from './PrefectureSelector';
import PopulationChart from './PopulationChart';
import axios,{ AxiosResponse } from 'axios';

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

function App() {
  type ApiData = {
    message: string | null;
    result: Prefecture[];
  };

  const [data, setData] = useState<ApiData>({ message: null, result: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([]);
  //都道府県別人口データの状態を管理するstateを作成する。
  const [selectedPrefPopulation, setSelectedPrefPopulation] = useState<PopulationData[]>([]);

  const handlePrefCheck = (checked: boolean, prefCode: number, prefName:string) => {

    const getData = async (prefCode: number): Promise<void> => {
      
        try {
          const res: AxiosResponse = await axios.get('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear', {
            headers: { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY },
            params: {
              prefCode: prefCode,
              cityCode: '-',
            },
          });
          //res.dataに{prefCode: number}のプロパティを追加する
          res.data.prefCode = prefCode;
          res.data.prefName = prefName;
          setSelectedPrefPopulation(prev => [...prev, res.data]);
        } catch (err) {
          console.error(`Error for prefCode ${prefCode}: `, err);
        }
    };

    const deleteData = async (prefCode: number): Promise<void> => {
      //selectedPrefPopulationというオブジェクトで構成された配列をループさせ、prefCodeが一致するデータを削除する。
      setSelectedPrefPopulation(prev => prev.filter(data => data.prefCode !== prefCode));
    };

    if (checked) {
      setSelectedPrefCodes(prev => [...prev, prefCode]);
      getData(prefCode);
    } else {
      setSelectedPrefCodes(prev => prev.filter(code => code !== prefCode));
      deleteData(prefCode);
    }
  };
  console.log(selectedPrefPopulation, "selectedPrefPopulation");
  useEffect(() => {
    axios
      .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY },
      })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setIsLoading(false);
      });
  }, []);

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
