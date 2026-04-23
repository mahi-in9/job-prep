import { useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [pos, setPos] = useState(0);

  const array = new Array(5).fill(null);

  function handleChange(e) {
    let val = e.target.value;
    array.push(val);
    setPos(pos + 1);
    setText(array[pos]);
  }
  console.log(array, pos);

  return (
    <div className="app">
      <input type="text" onChange={handleChange} value={text} />
      <button
        onClick={() => {
          setPos(pos - 1);
        }}
        disabled={pos === 0 && array[pos + 1] === null}
      >
        Undo
      </button>
      <button
        onClick={() => {
          setPos(pos + 1);
        }}
        disabled={pos === array.length && array[pos - 1] === null}
      >
        Redo
      </button>
    </div>
  );
}
