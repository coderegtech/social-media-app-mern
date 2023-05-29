import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user_uid = decoded.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default verifyJWT;
