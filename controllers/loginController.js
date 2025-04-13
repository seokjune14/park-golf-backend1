const pool = require("../config/db");

// 로그인 컨트롤러 (회원 전용, 평문 비밀번호 저장 시)
const loginUser = async (req, res) => {
  const { userEmail, userPw } = req.body;

  // 입력값 검증
  if (!userEmail || !userPw) {
    return res.status(400).json({ message: "이메일과 비밀번호를 모두 입력해주세요." });
  }

  try {
    // 이메일로 사용자 조회
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE userEmail = ?",
      [userEmail.trim()]
    );

    if (!rows || rows.length === 0) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }

    const user = rows[0];

    // 회원 전용 로그인: 강사는 차단
    if (user.userRole.trim().toLowerCase() !== "user") {
      return res.status(403).json({ message: "회원 전용 로그인입니다." });
    }

    // 평문 비밀번호 비교
    if (user.userPw.trim() !== userPw.trim()) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
    }

    // 로그인 성공
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
    console.error("로그인 실패:", err);
    res.status(500).json({ message: "서버 에러" });
  }
};

module.exports = { loginUser };
