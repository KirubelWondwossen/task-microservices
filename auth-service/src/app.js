const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// 👇 MUST be here
app.use(express.json());

const users = [];

// Register
app.post("/auth/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  users.push({ username, password });
  res.status(201).json({ message: "User registered" });
});

// Login
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// Health
app.get("/health", (req, res) => {
  res.json({ status: "Auth Service running" });
});

app.listen(4001, () => {
  console.log("Auth Service running on port 4001");
});
