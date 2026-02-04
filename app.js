//express setup
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use("/api", indexRouter); // /api 경로에 indexRouter 연결

const mongoURI = "mongodb://localhost:27017/todo-demo";

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
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
