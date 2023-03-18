import User from "../model/User.js";

const getUser = async (req, res) => {
  try {
    const { user_uid } = req.params;

    const user = await User.findOne({ user_uid }).select("-password");

    console.log(user);
    if (user) res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = (req, res) => {};

export { getUser, updateUser, getAllUsers };
