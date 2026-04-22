import { useEffect, useRef, useState } from "react";

export default function App() {
  const [text, setText] = useState(() => {
    return localStorage.getItem("value") || "";
  });

  const [delay, setDelay] = useState(() => {
    return Number(localStorage.getItem("delay")) || 0;
  });

  const [save, setSave] = useState("");

  const time = useRef(null);
  const delayTime = useRef(null);

  function handleChange(e) {
    let value = e.target.value;

    setSave("saving");
    setText(value);

    if (time.current) {
      clearTimeout(time.current);
    }

    time.current = setTimeout(() => {
      localStorage.setItem("value", value);
      setSave("saved");
    }, delay);
  }

  function handleDelay(e) {
    let val = Number(e.target.value);

    setDelay(val);
    setSave("saving");
    if (delayTime.current) {
      clearTimeout(delayTime.current);
    }

    delayTime.current = setTimeout(() => {
      localStorage.setItem("delay", val);
      setSave("saved");
    }, 0);
  }

  useEffect(() => {
    return () => {
      if (time.current) {
        clearTimeout(time.current);
      }
    };
  }, []);

  return (
    <div className="app">
      <h2>Type here</h2>
      <div className="">
        <label>Input Text box</label>
        <input
          type="text"
          placeholder="type here..."
          onChange={handleChange}
          value={text}
        />
      </div>
      <div>
        <label>Delay box</label>
        <input
          type="text"
          placeholder="enter delay time..."
          value={delay}
          onChange={handleDelay}
        />
      </div>
      <div className="save">
        <p>
          {save === "saving" ? "Saving..." : save === "saved" ? "saved" : ""}
        </p>
      </div>
    </div>
  );
}
