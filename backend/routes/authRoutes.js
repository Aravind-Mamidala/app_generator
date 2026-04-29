const express = require("express");
const router = express.Router();

const pool = require("../db/pool"); // 🔥 ADD THIS
const { login } = require("../controllers/authController");

const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    res.json({ message: "User created" });

  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ error: "User already exists" });
    }

    console.error("Signup error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", login);

module.exports = router;