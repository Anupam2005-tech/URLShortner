const express = require("express");
const {
  createuserHandle,
  fetchuserHandler,
  deleteuserHandle,
  updateuserHandle,
  userlogoutHandle,
  authCheckHandle
} = require("../controllers/controllers");
const {checkSession}=require('../services/middleware')
const Userrouter = express.Router();

// USERS AUTH ROUTERS
Userrouter.post("/register", createuserHandle);
Userrouter.post("/login", fetchuserHandler);
Userrouter.get("/check/auth",authCheckHandle)
Userrouter.post('user/logout',checkSession,userlogoutHandle)
Userrouter.put("/update", checkSession, updateuserHandle);
Userrouter.delete("/delete", checkSession, deleteuserHandle);

module.exports = Userrouter;