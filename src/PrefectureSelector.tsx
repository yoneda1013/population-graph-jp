import React from 'react';

type Prefecture = {
  prefCode: number;
  prefName: string;
};

type ApiData = {
  message: string | null;
  result: Prefecture[];
};

type PrefectureSelectorProps = {
  data: ApiData | null;
};

export default function PrefectureSelector({ data }: PrefectureSelectorProps) {
  console.log(typeof data, data, 'data at 子コンポーネント');

  return (
    <div>
      <h2>都道府県</h2>
      <p>PrefectureSelector</p>
      {data?.result &&
        data.result.map((prefecture: Prefecture) => (
          <div key={prefecture.prefCode}>
            <input type="checkbox" id={String(prefecture.prefCode)} />
            <label htmlFor={String(prefecture.prefCode)}>
              {prefecture.prefName}
            </label>
          </div>
        ))}
    </div>
  );
}
