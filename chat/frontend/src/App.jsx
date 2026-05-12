import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Connect to backend
const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // Receive messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    // cleanup (important)
    return () => socket.off("receive_message");
  }, []);

  // Send message
  const sendMessage = () => {
    if (!message.trim()) return;

    const messageData = {
      id: Date.now(),
      text: message,
    };

    socket.emit("send_message", messageData);
    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Socket Chat</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div>
        {chat.map((msg) => (
          <p key={msg.id}>{msg.text}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
