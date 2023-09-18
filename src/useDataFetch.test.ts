import { renderHook, waitFor } from '@testing-library/react';
import { usePrefPopulationFetch } from './useDataFetch';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

//handlePrefCheckのテスト 初期状態selectedPrefPopulation空→県が選択された状態→１.次の件が選択された　or ２。選択されてた件が削除される
test('handlePrefCheck', async () => {
  const { result } = renderHook(() => usePrefPopulationFetch());
  //あらかじめモックを作っておく axios.getの戻り値をモックにする
  mockedAxios.get.mockImplementation(() =>
    Promise.resolve({
      data: {
        message: null,
        result: {
          boundaryYear: 2020,
          data: [],
        },
        prefCode: 1,
        prefName: '北海道',
      },
    }),
  );

  expect(result.current.selectedPrefPopulation).toEqual([]);
  //県が選択された状態
  act(() => {
    result.current.handlePrefCheck(true, 1, '北海道');
  });
  await waitFor(() =>
    expect(result.current.selectedPrefPopulation).toEqual([
      {
        message: null,
        result: {
          boundaryYear: 2020,
          data: [],
        },
        prefCode: 1,
        prefName: '北海道',
      },
    ]),
  );
});

export {};
