const express=require('express')
const {createuserHandle,fetchuserHandler,deleteuserHandle}=require('../controllers/controllers')

const Userrouter=express.Router()

// USERS AUTH ROUTERS
Userrouter.post("/create",createuserHandle)
Userrouter.get("/fetch",fetchuserHandler)
Userrouter.delete('/delete',deleteuserHandle)

module.exports=Userrouter