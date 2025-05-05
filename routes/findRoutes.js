const express = require("express");
const router = express.Router();
const {
  findEmailByName,
  resetPasswordByEmail,
} = require("../controllers/findController");

// 아이디(이메일) 찾기
router.post("/find-email", findEmailByName);

// 비밀번호 재설정 (임시 비밀번호 발급)
router.post("/reset-password", resetPasswordByEmail);

module.exports = router;
