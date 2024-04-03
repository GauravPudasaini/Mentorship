// const Msg = require('./models/message')
// io.on('connection', socket => {

//     Msg.find().then((result)=>{
//         socket.emit('output-messages',result)
//     })
//     // console.log('new user')   // to check if the user is connected or not
//     // socket.emit('chat-message', 'hello world') 
//         socket.on('send-chat-message', message => {
//         // console.log(message)
//         const messages = new Msg({message})

//         messages.save().then(()=>{
//             io.emit('chat-message', message)
//         })

//         // socket.broadcast.emit('chat-message', message)
//     })
// })
import express from "express";
import Message from "../models/message.model.js";
import verify from "../verify.js";

const router = express.Router();

router.post("/messages", verify, async (req, res) => {
  try {
    const message = req.body.message;
    const id = req.payload.id
    const newMessage = new Message(
        {
            id: id,
            message: message,
        }
    );
    await newMessage.save();
    
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Error saving message" });
  }
});

router.get("/messages", verify, async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Error retrieving messages" });
  }
});

export default router;
