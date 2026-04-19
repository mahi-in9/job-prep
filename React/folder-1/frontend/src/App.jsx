import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState({});

  function validation(text) {
    const result = {};
    result.minChar = text.length < 8 ? false : true;
    result.hasLowerCase = /[a-z]/.test(text);
    result.hasNumber = /[0-9]/.test(text);
    result.hasSymbol = /[^A-Za-z0-9]/.test(text);
    console.log(result);
    return result;
  }

  const handleChange = (e) => {
    setText(e.target.value);
    setResult(validation(text));
  };
  validation(text);

 
  return (
    <div className="m-10">
      <input
        type="text"
        onChange={handleChange}
        className="border-2 border-white"
      />
      {text && (
        <p>
          Password should be -
          <span className={result.minChar ? "text-red-500" : "text-white"}>
            min 8 chars
          </span>
          , <span>one uppercase</span>, <span>one number</span>,{" "}
          <span>one special char</span>
        </p>
      )}
    </div>
  );
}

export default App;
