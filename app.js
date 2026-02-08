//express setup
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRouter); // /api 경로에 indexRouter 연결

const mongoURI = MONGODB_URI_PROD;

//mongoose connection
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

//app listener
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
