const startSocket = (app) => {
  const server = require("http").Server(app);

  server.listen(process.env.PORT, () =>
    console.log(`Server has loaded on ${process.env.PORT}`)
  );

  //! Socket IO setup
  const io = require("socket.io")(server, {
    cors: {
      origin: server,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // //! Manage socket io
  io.on("connection", (socket) => {
    console.log("Someone connected");
    socket.emit("connected");

    //? Send message to all room users..
    socket.on("message", (object) => {
      console.log("sending message to client");
      const message = object.message;
      console.log(message);
      socket.broadcast.emit("newMessage", message);
    });
  });
};

module.exports = startSocket;
