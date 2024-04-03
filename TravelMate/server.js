const mongoose = require("mongoose");
const Msg = require("./models/message");

const io = require("socket.io")(3000, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  Msg.find().then((result) => {
    socket.emit("output-messages", result);
  });
  // console.log('new user')   // to check if the user is connected or not
  // socket.emit('chat-message', 'hello world')
  socket.on("send-chat-message", (message) => {
    // console.log(message)
    const messages = new Msg({ message });

    messages.save().then(() => {
      io.emit("chat-message", message);
    });

    // socket.broadcast.emit('chat-message', message)
  });
});
