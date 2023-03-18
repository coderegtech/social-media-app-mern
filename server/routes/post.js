import express from "express";
import { addPost, getAllPosts, getUserPost } from "../controller/post.js";
import upload from "../middleware/uploadPost.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express.Router();

router.post("/addPost", upload.single("postImg"), verifyJWT, addPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getUserPost/:user_uid", verifyJWT, getUserPost);
export default router;
