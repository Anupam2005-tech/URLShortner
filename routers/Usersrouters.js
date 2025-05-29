const express = require("express");
const {
  createuserHandle,
  fetchuserHandler,
  deleteuserHandle,
  updateuserHandle,
} = require("../controllers/controllers");
const {checkSession}=require('../services/middleware')
const Userrouter = express.Router();

// USERS AUTH ROUTERS
Userrouter.post("/create", createuserHandle);
Userrouter.get("/login", fetchuserHandler);
Userrouter.put("/update", checkSession, updateuserHandle);
Userrouter.delete("/delete", checkSession, deleteuserHandle);

module.exports = Userrouter;