const express = require("express");
const URLrouter = require("./routers/URLrouters");
const Userrouter=require("./routers/Usersrouters")
const { mongoDBconnect } = require("./MongoDB");
const { getUser } = require("./services/cookies");
const cookieParser=require('cookie-parser')

const app = express();

const PORT = 8000;

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser())

async function checkSession(req,res,next){
  const token=req.cookies.token
  if(!token){
    return res.json({msg:'access denied'})
  }
  const user=getUser(token)
  if(!user){
    return res.json({msg:'access denied'})
  }
  req.user=user;
  next()
}


app.use("/url",checkSession, URLrouter);
app.use("/user",Userrouter)


mongoDBconnect("mongodb://localhost:27017/shortURL")
.then(()=>{
  console.log('MongoDb connected');
  
})
.catch((err)=>{
  console.error("MongoDB connection error:", err);
})
 
module.exports=checkSession

app.listen(PORT, () => {
  console.log("server started successfully");
});
