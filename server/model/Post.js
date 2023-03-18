import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
    },
    user_uid: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    post_description: {
      type: String,
    },
    postImgName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      timestamp: true,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamp: true }
);

export default mongoose.model("Post", postSchema);
