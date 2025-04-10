const express = require("express");
const router = express.Router();
const {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");

router.get("/", getLessons);              // 전체 조회
router.get("/:id", getLessonById);        // 상세 조회
router.post("/", createLesson);           // 등록
router.put("/:id", updateLesson);         // 수정
router.delete("/:id", deleteLesson);      // 삭제

module.exports = router;
