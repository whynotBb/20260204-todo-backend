const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");

// /tasks가 불리면, task.api.js로 라우팅
router.use("/tasks", taskApi);

module.exports = router;
