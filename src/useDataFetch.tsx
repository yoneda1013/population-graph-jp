import { useEffect, useState } from 'react';
import { ApiData } from './App';
import axios,{ AxiosResponse } from 'axios';
import { PopulationData } from './App';

export const useDataFetch =() => {
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
  
    return {data, isLoading};
}
  
export const usePrefPopulationFetch = () => {
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
        // setSelectedPrefCodes(prev => [...prev, prefCode]);
        getData(prefCode);
        } else {
        // setSelectedPrefCodes(prev => prev.filter(code => code !== prefCode));
        deleteData(prefCode);
        }
    };

    return {selectedPrefPopulation ,setSelectedPrefPopulation ,handlePrefCheck};
}