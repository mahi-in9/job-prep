const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
    });

    socket.on("messsage", ({ roomId, message }) => {
      io.to(roomId).emit("message", message);
    });
  });
};

module.exports = socketHandler;
