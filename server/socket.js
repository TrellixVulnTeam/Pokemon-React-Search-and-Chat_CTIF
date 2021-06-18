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
    console.log("A user connected");
    socket.emit("connected");

    //? Send message to all room users..
    socket.on("message", (message) => {
      socket.emit("newMessage", message);
    });
  });
};

module.exports = startSocket;
