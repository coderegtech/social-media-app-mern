import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDb from "./model/Database.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 9999;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/post", express.static(path.join(__dirname, "public/post")));
app.use("/profile", express.static(path.join(__dirname, "public/profile")));

// built-in middleware for json
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Cross Origin Resource Sharing
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, (res, err) => {
  if (err) res.json({ error: err });

  console.log("Server running to port http://localhost:" + PORT);
  connectDb();
});
