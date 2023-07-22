import React from 'react';
import { Prefecture } from './App';

type PrefectureSelectorProps = {
  data: {
    message: null | string,
    result: Prefecture[],
  } | null,
  onPrefCheck: (checked: boolean, prefCode: number) => void,
};

export default function PrefectureSelector({ data, onPrefCheck }: PrefectureSelectorProps) {
  console.log(typeof data, data, 'data at 子コンポーネント');

  return (
    <div>
      <h2>都道府県</h2>
      <p>PrefectureSelector</p>
      {data?.result &&
        data.result.map((prefecture: Prefecture) => (
          <div key={prefecture.prefCode}>
            <input type="checkbox" onChange={e => onPrefCheck(e.target.checked, prefecture.prefCode)} />
            <label htmlFor={String(prefecture.prefCode)}>
              {prefecture.prefName}
            </label>
          </div>
        ))}
    </div>
  );
}