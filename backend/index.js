const express = require("express");
const URLrouter = require("./routers/URLrouters");
const Userrouter = require("./routers/Usersrouters");
const { mongoDBconnect } = require("./MongoDB");
const cors=require('cors')
const {urlencoded,cookieParser,checkSession}=require('./services/middleware')

const app = express();

const PORT = 8000;

// CORS
app.use(cors({
  origin:"http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials:true
}))

// MIDDLEWARES
app.use(urlencoded);
app.use(cookieParser);

app.use("/url", checkSession, URLrouter);
app.use("/user", Userrouter);

mongoDBconnect("mongodb://localhost:27017/shortURL")
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.log("server started successfully");
});
