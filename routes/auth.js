const express = require("express");
const router = express.Router();

let users = []; // temporary storage

router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "All fields required" });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }

  users.push({ email, password });

  res.json({ msg: "Signup successful" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  res.json({ msg: "Login successful" });
});

module.exports = router;