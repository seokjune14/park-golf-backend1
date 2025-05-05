const pool = require("../config/db");
const crypto = require("crypto");

// 이름으로 이메일(아이디) 찾기
const findEmailByName = async (req, res) => {
  const { userName } = req.body;

  if (!userName) {
    return res.status(400).json({ message: "이름을 입력해주세요." });
  }

  try {
    const [rows] = await pool.query("SELECT userEmail FROM users WHERE userName = ?", [userName]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "해당 이름으로 등록된 이메일이 없습니다." });
    }

    res.status(200).json({ userEmail: rows[0].userEmail });
  } catch (err) {
    console.error("아이디 찾기 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 이메일로 임시 비밀번호 발급 (재설정 방식)
const resetPasswordByEmail = async (req, res) => {
  const { userEmail } = req.body;

  if (!userEmail) {
    return res.status(400).json({ message: "이메일을 입력해주세요." });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE userEmail = ?", [userEmail]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "해당 이메일로 등록된 사용자가 없습니다." });
    }

    // 임시 비밀번호 생성
    const tempPw = crypto.randomBytes(4).toString("hex"); // 8자리 임시 비번

    // 평문 그대로 저장 (보안을 위해 실제 서비스에서는 bcrypt 사용 권장)
    await pool.query("UPDATE users SET userPw = ? WHERE userEmail = ?", [tempPw, userEmail]);

    res.status(200).json({
      message: "임시 비밀번호가 발급되었습니다.",
      tempPassword: tempPw, // 실제 서비스에서는 이걸 이메일로 보내고 여기서 보여주진 않음
    });
  } catch (err) {
    console.error("비밀번호 재설정 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
};

module.exports = {
  findEmailByName,
  resetPasswordByEmail,
};
