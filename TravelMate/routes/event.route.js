import eventSchema from "../models/post.model.js";
import express from "express";
const router = express.Router();
import verify from "../verify.js";
import User from "../models/user.model.js";
import Event from "../models/post.model.js";

router.post("/addevent", verify, async (req, res) => {
  const authorid = await req.payload.id;
  const author = await User.findById(authorid);
  console.log(author)
  try {
    const newevent = new eventSchema({
      author: author.username,
      content: req.body.content,
      startdate: req.body.startdate,
      enddate: req.body.endDate,
    });
    const savedEvent = await newevent.save();
    res.status(200).json(savedEvent);
  } catch (error) {
    console.error(error);
  }
});
router.get("/all", verify, async (req, res) => {
  try {
    const allevents = await eventSchema.find({});
    res.status(200).json(allevents);
  } catch (error) {
    console.error(error);
  }
});

router.put("/tagalong", verify, async (req, res) => {
  const id = req.payload.id;
  const eventid = req.query.event;

  try {
    const user = await User.findById(id);
    const event = await Event.findById(eventid);
    // console.log(user.username,
    //   event.participants.some((x) => (x = { _id: user.id })) == false);
    if (
      event.author != user.username &&
      event.participants.some((x) => (x = { _id: user.id })) == false
    ) {
      const updateEvent = await Event.findByIdAndUpdate(
        eventid,
        {
          $push: { participants: [{ id: user, status: req.body.status }] },
        },
        { new: true }
      );
      res.status(200).json(updateEvent);
      // res.status(200).json({_id: user.id});
    } else {
      res
        .status(404)
        .json(
          "Error: You are the author of the event or you are already a participant."
        );
    }
  } catch (error) {
    console.error(error);
  }
});

router.delete("/tagalong", verify, async (req, res) => {
  const id = req.payload.id;
  const eventid = req.query.event;

  try {
    const user = await User.findById(id);
    const event = await Event.findById(eventid);
    if (
      event.author == id &&
      event.participants.some((x) => (x = { id: user.id }))
    ) {
      const updateEvent = await Event.findByIdAndUpdate(
        eventid,
        {
          $pull: { participants: {id: user} },
        },
        { new: true }
      );
      res.status(200).json(updateEvent);

      // res.status(200).json({_id: user.id});
    } else {
      res.status(200).json("Error: The participant does not exist");
    }
  } catch (error) {
    console.error(error);
  }
});
export default router;
