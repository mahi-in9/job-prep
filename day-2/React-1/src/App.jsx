import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [save, setSave] = useState("idle");

  const timeRef = useRef(null);

  const handleChange = (e) => {
    setWord(e.target.value);

    setSave("saving");

    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    timeRef.current = setTimeout(() => {
      setSave("saved");
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
    };
  }, []);

  return (
    <>
      <section>
        <input type="text" placeholder="Type here" onChange={handleChange} />
        <div>
          <p>{save === "saving" && "Saving..."}</p>
          <p>{save === "saved" && "Saved"}</p>
        </div>
      </section>
    </>
  );
}

export default App;
