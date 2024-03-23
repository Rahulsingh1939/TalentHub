const authMiddleware = require("../middlewares/authMiddleware");

const express = require("express");
const {
  addReportController,
  getAllReportController,
  getUserReportController,
} = require("../controller/reportController");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");

const router = express.Router();

router.post(
  "/add-report",
  authMiddleware,
  isAdminMiddleware,
  addReportController
);
router.post(
  "/get-all-reports",
  authMiddleware,
  isAdminMiddleware,
  getAllReportController
);
router.post(
  "/get-all-reports-by-user",
  authMiddleware,
  getUserReportController
);

module.exports = router;
