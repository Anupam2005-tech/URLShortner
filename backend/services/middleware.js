const express = require("express");
const cookieParser = require("cookie-parser");
const { getUser } = require("../services/cookies");

function checkSession(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "Access denied: No token provided" });
    }

    const user = getUser(token);

    if (!user || !user._id || !user.email) {
      return res.status(401).json({ msg: "Access denied: Invalid token" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("checkSession error:", err);
    return res.status(500).json({ msg: "Internal server error in session check" });
  }
}

module.exports = {
  urlencoded: express.urlencoded({ extended: true }),
  cookieParser: cookieParser(),
  checkSession,
};