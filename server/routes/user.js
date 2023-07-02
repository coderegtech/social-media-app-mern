import express from "express";
import { currentUser, getAllUsers, getUser } from "../controller/user.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express.Router();

router.get("/getUser/:user_uid", verifyJWT, getUser);
router.get("/users", verifyJWT, getAllUsers);
router.get("/currentUser", verifyJWT, currentUser);
export default router;
