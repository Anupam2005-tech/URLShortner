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

async function restrictToLoggedInUserOnly(req,res,next){
  const userUuid=req.cookie.userUuid
  const user=getUser(userUuid)
  if(!userUuid)
  {
    return res.json({msg:`error`})
  }
  else if(!user){
    return res.json({msg:`error found`})
  }
  else{
    req.user=user
    next()
  }
}
app.use(cookieParser())

app.use("/url",restrictToLoggedInUserOnly, URLrouter);
app.use("/user",Userrouter)

mongoDBconnect("mongodb://localhost:27017/shortURL")
.then(()=>{
  console.log('MongoDb connected');
  
})
.catch((err)=>{
  console.error("MongoDB connection error:", err);
})
 


app.listen(PORT, () => {
  console.log("server started successfully");
});
