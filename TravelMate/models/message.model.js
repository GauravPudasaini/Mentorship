import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  message: {
    type: String,
    required: true,
  },
});

const Msg = mongoose.model("message", msgSchema);
export default Msg;
