import express from "express";
import { login, logout, signin } from "../controller/auth.js";
import upload from "../middleware/uploadProfile.js";
const router = express.Router();

router.post("/signin", upload.single("profilePic"), signin);

router.post("/login", login);

router.post("/logout", logout);

export default router;
