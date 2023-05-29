import express from "express";
import {
  addCommentPost,
  addPost,
  deleteUserComment,
  deleteUserPost,
  getAllPosts,
  getPostComments,
  getUserPost,
} from "../controller/post.js";
import upload from "../middleware/uploadPost.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express.Router();

router.post("/addPost", upload.single("postImg"), verifyJWT, addPost);
router.get("/getAllPosts", verifyJWT, getAllPosts);
router.get("/getUserPost/:id", verifyJWT, getUserPost);
router.delete("/deletePost/:id", verifyJWT, deleteUserPost);

// comments
router.post("/addComment", verifyJWT, addCommentPost);
router.get("/comments", verifyJWT, getPostComments);
router.delete("/deleteComment", verifyJWT, deleteUserComment);

export default router;
