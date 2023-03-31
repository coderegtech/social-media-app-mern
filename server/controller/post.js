import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Post from "../model/Post.js";
import User from "../model/User.js";
const addPost = async (req, res) => {
  const { post_description } = req.body;
  const user_uid = req.user_uid;
  const { filename } = req.file;
  try {
    const { firstname, surname, profilePic } = await User.findOne({ user_uid });

    const newPost = await new Post({
      postId: uuidv4(),
      user_uid,
      profilePic,
      firstname,
      surname,
      post_description,
      postImgName: filename,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    await newPost.save();

    const post = await Post.find().sort("-createdAt");
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserPost = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ user_uid: id }).sort("-createdAt");

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
    const { firstname, surname, profilePic } = await User.findOne({ user_uid });

    await Post.updateOne(
      { postId },
      {
        $push: {
          comments: {
            commentId: uuidv4(),
            user_uid,
            firstname,
            surname,
            profilePic,
            comment,
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          },
        },
      },
      {
        upsert: true,
      }
    );

    const post = await Post.find().sort("-createdAt");
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUserComment = async (req, res) => {
  try {
    const { commentId, postId } = req.body;

    const posts = await Post.updateOne(
      { postId },
      { $pull: { comments: { commentId } } },
      { upsert: true }
    );

    if (posts) res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  addPost,
  getAllPosts,
  getUserPost,
  deleteUserPost,
  addCommentPost,
  deleteUserComment,
};
