const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", (msg) => {
    console.log("message: ", msg);

    socket.emit("welcome", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", async (req, res) => {
  res.send("running running..");
});

server.listen(3000, () => {
  console.log("app started...");
});
