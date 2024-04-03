import express from "express";
import mongoose from "mongoose";
import json from "body-parser";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import FacebookTokenStrategy from "passport-facebook-token";
import session from "express-session";
import fetch from "node-fetch";
import eventRoute from "./routes/event.route.js";
import authRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import requestRoute from "./routes/requests.route.js";

import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";

const io = new Server(server);
const app = express();

var server = http.createServer(app);

dotenv.config();

io.on("connection", (Socket) => {
  console.log("A user connected");
  Socket.on("chat message", async (message) => {
    try {
      const newMessage = new Message({
        id: id,
        message: message,
      });
      await newMessage.save();

      io.emit("chat message", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });
});

app.use(
  session({
    secret: process.env.secretkey,
    resave: true,
    saveUninitialized: true,
  })
);
const port = 3000;
app.use(express.json()).use(cors());

app.get("/", (req, res) => {
  res.status(200).json("hey");
});
app
  .use("/event", eventRoute)
  .use("/auth", authRoute)
  .use("/chat", messageRoute)
  .use("/requests", requestRoute);


app.listen(port, async () => {
  mongoose
    .connect(process.env.mongourl)
    .then(console.log("Connected to db"))
    .catch((err) => {
      console.error(err, "DB connection");
    });
  console.log(`Server listening on ${port}`);
});
