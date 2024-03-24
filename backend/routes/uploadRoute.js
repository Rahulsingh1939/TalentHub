const express = require("express");
const { getFiles, createNewFile } = require("../controller/uploadController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// GET /get all files
router.get("/getfiles", getFiles);

// POST /create new file
router.post("/", authMiddleware, createNewFile);
module.exports = router;
