import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

// ✅ CORS CONFIGURATION
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());


app.use(express.json());


app.use("/books", booksRoute);
app.use("/auth", authRoute);


app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Book Store");
});

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("App connected to DB");
  app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});
