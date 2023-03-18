import express from "express";
import { getAllUsers, getUser } from "../controller/user.js";

const router = express.Router();

router.get("/getUser/:user_uid", getUser);
router.get("/users", getAllUsers);
export default router;
