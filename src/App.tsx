import React, { useEffect, useState } from 'react';
import './App.css';
import PrefectureSelector from './PrefectureSelector';
import PopulationChart from './PopulationChart';
import axios from 'axios';
import { log } from 'console';

function App() {
  //非同期通信でhttps://opendata.resas-portal.go.jp/api/v1/prefecturesから都道府県一覧を取得してくる。
  type Prefecture = {
    prefCode: number;
    prefName: string;
  };

  type ApiData = {
    message: string | null;
    result: Prefecture[];
  };

  const [data, setData] = useState<ApiData>({ message: null, result: [] });
  const [isLoading, setIsLoading] = useState(true);

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
          <PrefectureSelector data={data} /> // データ取得後、PrefectureSelectorコンポーネントを表示
        )}
        <PopulationChart />
      </main>
    </div>
  );
}

export default App;
