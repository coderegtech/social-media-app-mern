import express from "express";
import { addPost, getAllPosts, getUserPost } from "../controller/post.js";
import upload from "../middleware/uploadPost.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express.Router();

router.post("/addPost", upload.single("postImg"), verifyJWT, addPost);
router.get("/getAllPosts", verifyJWT, getAllPosts);
router.get("/getUserPost/:id", verifyJWT, getUserPost);

export default router;
