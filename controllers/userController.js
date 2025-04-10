const pool = require("../config/db");
const bcrypt = require("bcrypt");

// 회원가입 처리 (비밀번호 해싱 적용)
const createUser = async (req, res) => {
  const { userName, userEmail, userPw, userinfo, userImg } = req.body;

  try {
    console.log("📥 회원가입 요청:", req.body);

    // bcrypt를 사용하여 비밀번호 해싱 (saltRounds: 10)
    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(userPw, saltRounds);

    const [result] = await pool.query(
      "INSERT INTO users (userName, userEmail, userPw, userinfo, userImg) VALUES (?, ?, ?, ?, ?)",
      [userName, userEmail, hashedPw, userinfo, userImg]
    );

    res.status(201).json({
      userNum: result.insertId,
      userName,
      userEmail,
      userinfo,
      userImg,
    });
  } catch (err) {
    console.error("❌ 유저 등록 실패:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "이미 등록된 이메일입니다." });
    }

    res.status(500).json({
      message: "서버 에러",
      error: err.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error("유저 조회 실패:", err);
    res.status(500).json({ message: "서버 에러" });
  }
};

module.exports = {
  getUsers,
  createUser,
};
