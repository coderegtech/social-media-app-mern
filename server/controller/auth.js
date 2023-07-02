import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import User from "../model/User.js";

const signin = async (req, res) => {
  try {
    const { firstname, surname, email, password } = req.body;
    const { filename } = req.file;
    // find email if existing
    const foundUser = await User.findOne({ email }).exec();
    if (foundUser) return res.status(409).json("Email is already exist!");

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const user = await new User({
      user_uid: uuidv4(),
      firstname,
      surname,
      email,
      password: passwordHashed,
      profilePic: filename,
    });

    const saveNewUser = await user.save();

    if (saveNewUser) return res.status(201).json("User Created Successfully");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;

    // find email if existing
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(404).json({ message: "User not found!" });

    // verifyPassword
    const verifyPassword = bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    if (!verifyPassword) return res.status(409).json("Wrong password!");

    // create JWTs
    const accessToken = jwt.sign(
      { id: foundUser.user_uid },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: foundUser.user_uid },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // change isOnline to true
    foundUser.isOnline = true;
    // Saving accessToken with current user
    foundUser.accessToken = accessToken;
    await foundUser.save();

    const currentUser = await User.findOne({ email }).select("-password");

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and acces  s token to user
    res.status(200).json({ accessToken, currentUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = async (req, res, next) => {
  try {
    const user_uid = req.body.user_uid;
    const foundUser = await User.findOne({ user_uid }).exec();

    foundUser.isOnline = false;
    foundUser.accessToken = "";
    await foundUser.save();

    next();

    return res.clearCookie("jwt").status(200).json("User has been logged out!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { login, logout, signin };
