const express = require("express");
const router = express.Router();
const User = require("../models/user");

// POST a new user
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User({ name, email, password });
  await newUser.save();
  res.status(201).json(newUser);
});

// GET all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET a user by ID
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// UPDATE a user
router.put("/:id", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, password },
    { new: true }
  );
  res.json(user);
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;
