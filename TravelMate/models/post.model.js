import mongoose from "mongoose";
const eventSchema = new mongoose.Schema(
  {
    author: {
      type: String,
    },
    startdate:{
      type: Date,
    },
    enddate: {
      type: Date,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    }],
    participants: [{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      status: {
        type: String,
        enum: ["Accepted", "Cancelled", "Pending"],
        default: "Pending",
      },
    }],
    content: {
      type: String,
    },
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        content: {
          type: String,
        }
      },
    ]
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Event", eventSchema)
