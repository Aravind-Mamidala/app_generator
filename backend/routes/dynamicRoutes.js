const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const { createData, getData } = require("../controllers/dynamicController");

router.post("/:entity", verifyToken, createData);
router.get("/:entity", verifyToken, getData);

module.exports = router;