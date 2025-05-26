const express = require("express");
const URLrouter = require("./routers/router");
const { mongoDBconnect } = require("./MongoDB");
const URL = require("./modals/urlSchema");
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.use("/url", URLrouter);


mongoDBconnect("mongodb://127.0.0.1:27017/shortURL")
.then(()=>{
  console.log('MongoDb connected');
  
})
.catch((err)=>{
  console.error("MongoDB connection error:", err);
})
 


app.listen(PORT, () => {
  console.log("server started successfully");
});
