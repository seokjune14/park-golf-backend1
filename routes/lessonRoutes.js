const express = require("express");
const router = express.Router();
const {
  getLessons,
  getLessonById,
  getLessonsByInstructor, // ✅ 강사 전용 레슨 조회 함수 추가
  createLesson,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");

// 전체 레슨 조회
router.get("/", getLessons);

// 강사 전용 레슨 조회 (userNum 기준)
router.get("/instructor/:userNum", getLessonsByInstructor); 

// 레슨 상세 조회
router.get("/:id", getLessonById);

// 레슨 등록
router.post("/", createLesson);

// 레슨 수정
router.put("/:id", updateLesson);

// 레슨 삭제
router.delete("/:id", deleteLesson);

module.exports = router;
