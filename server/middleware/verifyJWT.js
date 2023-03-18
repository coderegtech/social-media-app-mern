import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log(decoded);
    // req.email = decoded.user_uid;
  });
  next();
};

export default verifyJWT;
