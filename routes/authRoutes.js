const express = require("express");
const router = express.Router();
const { loginInstructor } = require("../controllers/authController");

// 강사 로그인만 구현
router.post("/login-instructor", loginInstructor);

module.exports = router;
