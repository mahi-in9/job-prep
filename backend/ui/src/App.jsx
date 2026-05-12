import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected to backend");
});

socket.emit("message", "hello backend");

import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [msg, setMessage] = useState("");
  const [response, setResponse] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("message", msg);
    setMessage("");
    socket.on("welcome", (msg) => {
      console.log(msg);
      setResponse(msg);
    });
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={msg}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>

        {response && <p>{response}</p>}
      </div>
    </>
  );
}

export default App;
