const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../config/db");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User registered" });
    }
  );
});

// LOGIN
router.post(
  "/login",
  passport.authenticate("local"),
  (req, res) => {
    console.log("LOGIN BODY:", req.body);
    res.json({ message: "Login successful", user: req.user });
  }
);

// LOGOUT
router.post("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

// CURRENT USER
router.get("/me", (req, res) => {
  res.json(req.user || null);
});

module.exports = router;
