import { Prefecture } from './App';

type PrefectureSelectorProps = {
  data: {
    message: null | string,
    result: Prefecture[],
  } | null,
  onPrefCheck: (checked: boolean, prefCode: number, prefName: string) => void,
};
//県が描画されるかはprefSelectorのテスト内で行う
export default function PrefectureSelector({ data, onPrefCheck }: PrefectureSelectorProps) {
  return (
    <div>
      <h2>都道府県</h2>
      <p>PrefectureSelector</p>
      {data?.result &&
        data.result.map((prefecture: Prefecture) => (
          <div key={prefecture.prefCode}>
            <input type="checkbox" onChange={e => onPrefCheck(e.target.checked, prefecture.prefCode, prefecture.prefName)} />
            <label htmlFor={String(prefecture.prefCode)}>
              {prefecture.prefName}
            </label>
          </div>
        ))}
    </div>
  );
}
