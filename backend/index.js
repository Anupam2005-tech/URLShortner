const express = require("express");
const URLrouter = require("./routers/URLrouters");
const Userrouter = require("./routers/Usersrouters");
const { mongoDBconnect } = require("./MongoDB");
const cors = require("cors");
const { urlencoded ,cookieParser, checkSession } = require("./services/middleware");
const dotenv=require('dotenv')
const app = express();
dotenv.config()

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(urlencoded);
app.use(cookieParser);
app.use(express.json());



app.use("/url", checkSession, URLrouter);
app.use("/user", Userrouter);

app.get("/"),(req,res)=>{
  return res.end('hello')
}

// mongoDBconnect(process.env.mongodbURL)
//   .then(() => {
//     console.log(" MongoDB connected");
   
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//   });

const PORT = process.env.PORT || 8000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports=app