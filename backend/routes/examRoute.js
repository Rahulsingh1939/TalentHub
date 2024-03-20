const express = require("express");
const {
  addExamController,
  getAllExamController,
  getExamByIdController,
  editExamByIdController,
  deleteExamByIdController,
  addQuestionController,
  deleteQuestionController,
  editQuestionController,
} = require("../controller/examController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addExamController);
router.post("/get-all-exams", authMiddleware, getAllExamController);
router.post("/get-exam-by-id", authMiddleware, getExamByIdController);
router.post("/edit-exam-by-id", authMiddleware, editExamByIdController);
router.post("/delete-exam-by-id", authMiddleware, deleteExamByIdController);
router.post("/add-question-to-exam", authMiddleware, addQuestionController);
router.post(
  "/delete-question-in-exam",
  authMiddleware,
  deleteQuestionController
);
router.post("/edit-question-in-exam", authMiddleware, editQuestionController);

module.exports = router;
