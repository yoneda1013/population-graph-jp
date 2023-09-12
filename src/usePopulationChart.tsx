
import { useState } from 'react';
import { PopulationData } from './App';
import { PopulationChartProps } from './App';

export const usePopulationChart = ({selectedPrefPopulation}: PopulationChartProps) => {
    const [selectedType, setSelectedType] = useState<number>(0);
    const dataChart: { year: number; [key: string]: number }[]  = [
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
  
    const colorMap: { [key: string]: string } = {  
      "北海道": "#FF0000",
      "青森県": "#FF3300",
      "岩手県": "#FF6600",
      "宮城県": "#FF9900",
      "秋田県": "#FFCC00",
      "山形県": "#FFFF00",
      "福島県": "#99CC00",
      "茨城県": "#66CC00",
      "栃木県": "#33CC00",
      "群馬県": "#00CC00",
      "埼玉県": "#00CC33",
      "千葉県": "#00CC66",
      "東京都": "#00CC99",
      "神奈川県": "#00CCCC",
      "新潟県": "#00CCFF",
      "富山県": "#0099CC",
      "石川県": "#0066CC",
      "福井県": "#0033CC",
      "山梨県": "#0000CC",
      "長野県": "#3300CC",
      "岐阜県": "#6600CC",
      "静岡県": "#9900CC",
      "愛知県": "#CC00CC",
      "三重県": "#CC0099",
      "滋賀県": "#CC0066",
      "京都府": "#CC0033",
      "大阪府": "#CC0000",
      "兵庫県": "#CC3300",
      "奈良県": "#CC6600",
      "和歌山県": "#CC9900",
      "鳥取県": "#CCCC00",
      "島根県": "#99CC33",
      "岡山県": "#66CC33",
      "広島県": "#33CC33",
      "山口県": "#00CC66",
      "徳島県": "#00CC99",
      "香川県": "#00CCCC",
      "愛媛県": "#00CCFF",
      "高知県": "#3399CC",
      "福岡県": "#3366CC",
      "佐賀県": "#3333CC",
      "長崎県": "#6633CC",
      "熊本県": "#9933CC",
      "大分県": "#CC33CC",
      "宮崎県": "#CC3399",
      "鹿児島県": "#CC3366",
      "沖縄県": "#CC3333",
    };
    
    
  
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
    return { selectedType, dataChart, onTypeCheck, colorMap };
  }