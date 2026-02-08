const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// FE에서 유저정보요청 시 항상 password 를 빼고 보내는 함수
userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  return obj;
};

// 토큰 발행
// 연관 있는 모델과 함께 함수를 사용하여 다른 곳에서도 토큰을 사용할 수 있음
userSchema.methods.generateToken = function () {
  // 토큰 생성 시 user 정보와 secret key 보내준다.
  // {expiresIn:'1d'} 유효기간 설정
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, { expiresIn: "1d" });
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
