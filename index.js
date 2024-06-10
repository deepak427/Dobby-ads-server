import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import userRoutes from "./routes/user.js";
import folderRoutes from "./routes/folder.js"

mongoose.set("strictQuery", true);

const app = express();
dotenv.config();

app.use(express.json({ limit: "300mb", extended: true }));
app.use(express.urlencoded({ limit: "300mb", extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to Dobby ads.");
});

app.use("/user", userRoutes);
app.use("/folder", folderRoutes)

const PORT = 4253;

const DATABASE_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DATABASE_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
