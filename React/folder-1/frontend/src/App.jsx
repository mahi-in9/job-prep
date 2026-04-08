import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const clickKarenge = () => {
    setValue(name);
  };

  const changeKarenge = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h1>Hello {value}</h1>
      <input type="text" onChange={changeKarenge} />

      <button onClick={clickKarenge}>submit</button>
    </div>
  );
}

export default App;
