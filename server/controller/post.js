import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Comment from "../model/Comment.js";
import Post from "../model/Post.js";
import User from "../model/User.js";
const addPost = async (req, res) => {
  const { post_description } = req.body;
  const user_uid = req.user_uid;
  const { filename } = req.file;
  try {
    const user = await User.findOne({ user_uid });

    const newPost = await new Post({
      postId: uuidv4(),
      users: user._id,
      post_description,
      postImgName: filename,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    await newPost.save();

    const post = await Post.find().populate("users").sort("-createdAt");
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "users",
        select: "-email -friends -posts -password -accessToken",
      })
      .populate("comments")
      .sort("-createdAt");

    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserPost = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ user_uid: id })
      .populate({
        path: "users",
        select: "-email -friends -posts -password -accessToken",
      })
      .populate("comments")
      .sort("-createdAt");

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUserPost = async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await Post.deleteOne({ postId: id });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addCommentPost = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const user_uid = req.user_uid;

    const post = await Post.findOne({ postId });
    const user = await User.findOne({ user_uid });

    const addComment = await new Comment({
      user: user._id,
      post: post._id,
      comment,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    const postComment = await Comment.find()
      .populate("posts")
      .populate({
        path: "users",
        select: "-friends -posts -password -accessToken",
      })
      .sort("-createdAt");

    if (addComment) res.status(201).json(postComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("posts")
      .populate("users")
      .sort("-createdAt");

    console.log(comments);

    if (comments) res.status(201).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUserComment = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  addCommentPost,
  addPost,
  deleteUserComment,
  deleteUserPost,
  getAllPosts,
  getPostComments,
  getUserPost,
};
