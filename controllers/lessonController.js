const pool = require("../config/db");

// 전체 레슨 조회
const getLessons = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM lessons");
    res.json(rows);
  } catch (err) {
    console.error("레슨 조회 실패:", err);
    res.status(500).send("서버 에러");
  }
};

// 레슨 상세 조회
const getLessonById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM lessons WHERE lesNum = ?", [id]);
    if (rows.length === 0) return res.status(404).send("레슨 없음");
    res.json(rows[0]);
  } catch (err) {
    console.error("레슨 상세 조회 실패:", err);
    res.status(500).send("서버 에러");
  }
};

// 강사 전용 레슨 조회
const getLessonsByInstructor = async (req, res) => {
  const { userNum } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM lessons WHERE userNum = ?", [userNum]);
    res.json(rows);
  } catch (err) {
    console.error("강사 레슨 조회 실패:", err);
    res.status(500).send("서버 에러");
  }
};

// 레슨 등록
const createLesson = async (req, res) => {
  const { userNum, lesName, lesinfo, lesPlace, lesDetailPlace, lesPrice, lesTime } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO lessons (userNum, lesName, lesinfo, lesPlace, lesDetailPlace, lesPrice, lesTime) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userNum, lesName, lesinfo, lesPlace, lesDetailPlace, lesPrice, lesTime]
    );
    res.status(201).json({
      lesNum: result.insertId,
      userNum,
      lesName,
      lesinfo,
      lesPlace,
      lesDetailPlace,
      lesPrice,
      lesTime
    });
  } catch (err) {
    console.error("레슨 등록 실패:", err);
    res.status(500).send("서버 에러");
  }
};

// 레슨 수정
const updateLesson = async (req, res) => {
  const { id } = req.params;
  const { lesName, lesinfo, lesPlace, lesDetailPlace, lesPrice, lesTime } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE lessons SET lesName = ?, lesinfo = ?, lesPlace = ?, lesDetailPlace = ?, lesPrice = ?, lesTime = ? WHERE lesNum = ?",
      [lesName, lesinfo, lesPlace, lesDetailPlace, lesPrice, lesTime, id]
    );
    res.json({
      lesNum: id,
      lesName,
      lesinfo,
      lesPlace,
      lesDetailPlace,
      lesPrice,
      lesTime
    });
  } catch (err) {
    console.error("레슨 수정 실패:", err);
    res.status(500).send("서버 에러");
  }
};

// 레슨 삭제
const deleteLesson = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM lessons WHERE lesNum = ?", [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error("레슨 삭제 실패:", err);
    res.status(500).send("서버 에러");
  }
};

module.exports = {
  getLessons,
  getLessonById,
  getLessonsByInstructor,
  createLesson,
  updateLesson,
  deleteLesson
};
