import * as mongoose  from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileL:{
        profilepic: {
          type: String,
          required: false,
          default: "",
        },
        email: {
          type: String,
          required: false,
          default: "",
        },
        birthdate: {
          type: Date,
          required: false,
        },
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", userSchema)