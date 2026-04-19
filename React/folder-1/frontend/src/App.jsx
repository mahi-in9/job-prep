import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const result = validation(text);

  function validation(text) {
    const result = {};
    result.minChar = text.length < 8 ? false : true;
    result.hasUpperCase = /[A-Z]/.test(text);
    result.hasNumber = /[0-9]/.test(text);
    result.hasSymbol = /[^A-Za-z0-9]/.test(text);
    console.log(result);
    return result;
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
  };
  console.log(result);

  return (
    <div className="m-10">
      <input
        type="text"
        onChange={handleChange}
        className="border-2 border-white"
      />
      {text && (
        <p>
          Password should be -{" "}
          <span className={result.minChar ? "valid" : "invalid"}>
            {" "}
            min 8 chars
          </span>
          ,{" "}
          <span className={result.hasUpperCase ? "valid" : "invalid"}>
            {" "}
            one uppercase
          </span>
          ,{" "}
          <span className={result.hasNumber ? "valid" : "invalid"}>
            {" "}
            one number
          </span>
          ,{" "}
          <span className={result.hasSymbol ? "valid" : "invalid"}>
            one special char
          </span>
        </p>
      )}
    </div>
  );
}

export default App;
