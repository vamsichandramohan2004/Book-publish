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
  origin: "http://localhost:5173",   // ✅ EXACT MATCH, no trailing slash
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],  // ✅ Allow auth header
  credentials: true
}));

// ✅ MUST INCLUDE THIS TO RESPOND TO OPTIONS (Preflight)
app.options("*", cors());

// ✅ JSON BODY PARSER
app.use(express.json());

// ✅ ROUTES
app.use("/books", booksRoute);
app.use("/auth", authRoute);

// ✅ ROOT TEST ROUTE
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Book Store");
});

// ✅ MONGODB CONNECT + SERVER START
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
