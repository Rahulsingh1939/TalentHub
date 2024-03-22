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
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, isAdminMiddleware, addExamController);
router.post(
  "/get-all-exams",
  authMiddleware,
  getAllExamController
);
router.post(
  "/get-exam-by-id",
  authMiddleware,
  getExamByIdController
);
router.post(
  "/edit-exam-by-id",
  authMiddleware,
  isAdminMiddleware,
  editExamByIdController
);
router.post(
  "/delete-exam-by-id",
  authMiddleware,
  isAdminMiddleware,
  deleteExamByIdController
);
router.post(
  "/add-question-to-exam",
  authMiddleware,
  isAdminMiddleware,
  addQuestionController
);
router.post(
  "/delete-question-in-exam",
  authMiddleware,
  isAdminMiddleware,
  deleteQuestionController
);
router.post(
  "/edit-question-in-exam",
  authMiddleware,
  isAdminMiddleware,
  editQuestionController
);

module.exports = router;
