import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    timestamp: true,
    required: true,
  },
});

export default mongoose.model("Comment", commentSchema);
