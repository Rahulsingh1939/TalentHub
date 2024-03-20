
const authMiddleware = require("../middlewares/authMiddleware");

const express = require("express");
const {
  registerController,
  loginController,
  getInfoController,
} = require("../controller/userController");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/get-user-info",authMiddleware, getInfoController);

module.exports = router;
