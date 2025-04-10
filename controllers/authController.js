// controllers/authController.js
const pool = require("../config/db");
const bcrypt = require("bcrypt");

// 강사 로그인 처리 (전용 엔드포인트)
const loginInstructor = async (req, res) => {
  const { userEmail, userPw } = req.body;

  // 이메일/비밀번호가 전달되지 않았다면 400
  if (!userEmail || !userPw) {
    return res
      .status(400)
      .json({ message: "이메일과 비밀번호를 모두 입력해주세요." });
  }

  console.log("강사 로그인 요청:", { userEmail, userPw });

  try {
    // userEmail로 사용자 조회
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE userEmail = ?",
      [userEmail]
    );

    // 해당 이메일의 유저가 없으면 401
    if (rows.length === 0) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }

    const user = rows[0];

    // userRole이 "instructor"인지 검사
    if (user.userRole !== "instructor") {
      return res.status(401).json({ message: "강사 계정이 아닙니다." });
    }

    // bcrypt로 비밀번호 비교
    const isMatch = await bcrypt.compare(userPw, user.userPw);
    if (!isMatch) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }

    // 로그인 성공 시 유저 정보 반환
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
  // 강사 로그인만 노출
  loginInstructor,
};
