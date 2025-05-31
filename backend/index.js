const express = require("express");
const URLrouter = require("./routers/URLrouters");
const Userrouter = require("./routers/Usersrouters");
const { mongoDBconnect } = require("./MongoDB");
const cors = require("cors");
const { urlencoded, cookieParser, checkSession } = require("./services/middleware");
const cluster = require("node:cluster");
const os = require("os");

const PORT = 8000;

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {

  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = express();

  // CORS
  app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));

  // MIDDLEWARES
  app.use(urlencoded);
  app.use(cookieParser);

  app.use("/url", checkSession, URLrouter);
  app.use("/user", Userrouter);

  mongoDBconnect("mongodb://localhost:27017/shortURL")
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });

  app.listen(PORT, () => {
    console.log(` started and server running on port `);
  });
}
