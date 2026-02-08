const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const UserController = {};

//회원가입
UserController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    // 이미 가입 된 유저인지 확인
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error("이미 가입된 유저 입니다.");
    }
    // 암호화
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    console.log("hash", hash);
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "fail", err });
  }
};

//로그인
UserController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(" req.body", req.body);
    // 보내주지 말아야 할 정보는 '-@@'로 추가해준다.
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
    if (user) {
      // 유저 있으면, 비밀번호 일치하는지 비교(암호화된 비번으로 비교)하고 토큰발행
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    } else {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = UserController;
