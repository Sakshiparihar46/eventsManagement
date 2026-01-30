const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../config/db");
const router = express.Router();

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

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json(err);

    if (!user) {
      return res.status(401).json({
        message: info?.message || "Login failed"
      });
    }

    req.logIn(user, (err) => {
      if (err) return res.status(500).json(err);
      return res.json({
        message: "Login successful",
        user: user
      });
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

router.get("/me", (req, res) => {
  res.json(req.user || null);
});

module.exports = router;
