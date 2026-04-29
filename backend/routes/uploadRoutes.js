const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const { uploadCSV } = require("../controllers/uploadController");

router.post("/:entity", verifyToken, uploadCSV);

module.exports = router;