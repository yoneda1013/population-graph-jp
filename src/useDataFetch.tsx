import { useEffect, useState } from 'react';
import { ApiData } from './App';
import axios, { AxiosResponse } from 'axios';
import { PopulationData } from './App';

export const useDataFetch = () => {
  //TODO predDataなど、dataが何を示すかわかるようにする
  //外部APIを呼び出して、dataを返していることをテストする。
  //外部APIが仕様通りに呼び出されている　初期状態になってること確認する→getの処理をモックする→getの中でsetTimeOutなど使って処理をコマ送りにする。
  const [data, setData] = useState<ApiData>({ message: null, result: [] });
  const [isLoading, setIsLoading] = useState(true);

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

  return { data, isLoading };
};

//handlePrefCheckのテスト 初期状態selectedPrefPopulation空→県が選択された状態→１.次の件が選択された　or ２。選択されてた件が削除される
export const usePrefPopulationFetch = () => {
  const [selectedPrefPopulation, setSelectedPrefPopulation] = useState<
    PopulationData[]
  >([]);

  const handlePrefCheck = (
    checked: boolean,
    prefCode: number,
    prefName: string,
  ) => {
    const getData = async (prefCode: number): Promise<void> => {
      try {
        const res: AxiosResponse = await axios.get(
          'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear',
          {
            headers: { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY },
            params: {
              prefCode: prefCode,
              cityCode: '-',
            },
          },
        );
        //res.dataに{prefCode: number}のプロパティを追加する
        res.data.prefCode = prefCode;
        res.data.prefName = prefName;
        setSelectedPrefPopulation((prev) => [...prev, res.data]);
      } catch (err) {
        console.error(`Error for prefCode ${prefCode}: `, err);
      }
    };

    const deleteData = async (prefCode: number): Promise<void> => {
      //selectedPrefPopulationというオブジェクトで構成された配列をループさせ、prefCodeが一致するデータを削除する。
      setSelectedPrefPopulation((prev) =>
        prev.filter((data) => data.prefCode !== prefCode),
      );
    };

    if (checked) {
      getData(prefCode);
    } else {
      deleteData(prefCode);
    }
  };

  return { selectedPrefPopulation, handlePrefCheck };
};
