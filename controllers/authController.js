const pool = require("../config/db");

// 강사 로그인 처리 (평문 비밀번호 비교)
const loginInstructor = async (req, res) => {
  const { userEmail, userPw } = req.body;

  if (!userEmail || !userPw) {
    return res
      .status(400)
      .json({ message: "이메일과 비밀번호를 모두 입력해주세요." });
  }

  console.log("강사 로그인 요청:", { userEmail, userPw });

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE userEmail = ?",
      [userEmail]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }

    const user = rows[0];

    if (user.userRole !== "instructor") {
      return res.status(401).json({ message: "강사 계정이 아닙니다." });
    }

    // 평문 비밀번호 직접 비교
    if (user.userPw !== userPw) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }

    res.status(200).json({
      message: "로그인 성공",
      user: {
        userNum: user.userNum,
        userName: user.userName,
        userEmail: user.userEmail,
        userRole: user.userRole,
      },
    });
  } catch (err) {
    console.error("강사 로그인 실패:", err);
    res.status(500).json({ message: "서버 에러" });
  }
};

module.exports = {
  loginInstructor,
};