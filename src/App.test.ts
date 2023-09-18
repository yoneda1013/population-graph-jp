import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

//Loadingのステータスによって描画が変わるか（条件分岐 returnの内容をみる必要がある Loadingの状態はカスタムフックをモックすることで状態を作り出す）

//取得した要素に対してユーザー操作を行う→チェックボックスにチェックを入れる

//対象の要素が期待した状態になっているかを確認する→チェックボックスにチェックを入れた時に、チェックが入っているか


test("App.test check", () => {
    console.log("OK");
  });

  export {};