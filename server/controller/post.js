import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Post from "../model/Post.js";
import User from "../model/User.js";
const addPost = async (req, res) => {
  const { user_uid, post_description } = req.body;
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
    console.log(posts);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { addPost, getAllPosts, getUserPost };
