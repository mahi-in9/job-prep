import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const inputRef = useRef(0);

  useEffect(() => {}, []);

  const handleCLick = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input
        type="text"
        ref={inputRef}
        style={{ border: "2px" }}
        placeholder="type"
      />

      <button onClick={handleCLick}>focus</button>
    </>
  );
}

export default App;
