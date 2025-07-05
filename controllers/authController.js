const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { json } = require("express");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Body: ", req.body)
  try {
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only true in production
      sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
    });

    res.status(201).json({ status: "success", data: { user } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only true in production
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
  });

  res.status(200).json({ status: "success", data: { user } });
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ status: "success", data: { user } });
};