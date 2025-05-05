const pool = require("../config/db");

// 신청 등록
const createApplication = async (req, res) => {
  const { userNum, lesNum } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO applications (userNum, lesNum) VALUES (?, ?)",
      [userNum, lesNum]
    );
    res.status(201).json({ message: "신청 완료", appId: result.insertId });
  } catch (err) {
    console.error("신청 등록 실패:", err);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 신청 상태 변경 (승인/거절/취소)
const updateApplicationStatus = async (req, res) => {
  const { appId } = req.params;
  const { status } = req.body;

  try {
    await pool.query(
      "UPDATE applications SET status = ? WHERE appId = ?",
      [status, appId]
    );
    res.status(200).json({ message: "상태 업데이트 완료" });
  } catch (err) {
    console.error("상태 변경 실패:", err);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 신청 목록 조회 (전체 or userNum or lesNum으로 필터링 가능)
const getApplications = async (req, res) => {
  const { userNum, lesNum } = req.query;

  try {
    let query = "SELECT * FROM applications";
    const conditions = [];
    const values = [];

    if (userNum) {
      conditions.push("userNum = ?");
      values.push(userNum);
    }

    if (lesNum) {
      conditions.push("lesNum = ?");
      values.push(lesNum);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    const [rows] = await pool.query(query, values);
    res.status(200).json(rows);
  } catch (err) {
    console.error("신청 조회 실패:", err);
    res.status(500).json({ message: "서버 오류" });
  }
};

module.exports = {
  createApplication,
  updateApplicationStatus,
  getApplications,
};
