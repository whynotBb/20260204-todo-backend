// task 관련 schema 정의
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskShema = Schema(
  {
    task: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }, // createdAt, updatedAt 자동 생성
);

// data base model export
const Task = mongoose.model("Task", taskShema);

module.exports = Task;
