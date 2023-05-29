import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
    },
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamp: true }
);

export default mongoose.model("Post", postSchema);
