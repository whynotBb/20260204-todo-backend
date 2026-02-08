const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");

// 회원가입
router.post("/", UserController.createUser);

// 로그인 : 이메일,패스워드 body 에 보내기 위해 post 사용
// get 은 body 사용 안됨
router.post("/login", UserController.loginWithEmail);

module.exports = router;
