const express = require("express");
const router = express.Router();
const { getUsers, createUser } = require("../controllers/userController");

router.get("/", getUsers);       // 모든 유저 조회
router.post("/", createUser);    // 유저 등록

module.exports = router;
