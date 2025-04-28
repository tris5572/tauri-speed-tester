import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [array, setArray] = useState<number[]>([]);

  const LOOP_COUNT = 500;

  const run = async (f: string, args?: any) => {
    const before = performance.now();
    // 100回実行する
    for (let i = 0; i < LOOP_COUNT; i++) {
      await invoke(f, args);
    }
    const time = performance.now() - before;
    setArray([...array, time]);
  };

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <main className="container">
      <div className="flex">
        <button onClick={() => run("f0")}>何もしない関数 f0</button>
        <button onClick={() => run("f1")}>数値を返すだけの関数 f1</button>
        <button onClick={() => run("f2")}>文字列を返すだけの関数 f2</button>
        <button onClick={() => run("f3", { v: 1 })}>数値→数値の関数 f3</button>
      </div>

      <div>
        {" 最新10件: "}
        {array.length === 0
          ? "-"
          : array.slice(-10).map((v) => `${Math.round(v)} `)}
      </div>
      <div>
        {"平均値: "}
        {Math.round(array.reduce((acc, cur) => acc + cur, 0) / array.length)}
      </div>
      <button onClick={() => setArray([])}>結果をリセット</button>
    </main>
  );
}

export default App;
