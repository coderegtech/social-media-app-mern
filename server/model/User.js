import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    user_uid: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    surname: {
      type: String,
      required: true,
      min: 5,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    profilePic: {
      type: String,
      default: "",
    },
    coverPic: {
      type: String,
    },
    isOnline: {
      type: Boolean,
      required: true,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    accessToken: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
