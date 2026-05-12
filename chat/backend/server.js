const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // restrict in production
    methods: ["GET", "POST"],
  },
});

// Handle connections
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for message from client
  socket.on("send_message", (data) => {
    console.log("Message received:", data);

    // Broadcast to ALL clients (including sender)
    io.emit("receive_message", data);

    // Alternative:
    // socket.broadcast.emit("receive_message", data); // excludes sender
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Basic route
app.get("/", (req, res) => {
  res.send("Socket.IO Server Running");
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
