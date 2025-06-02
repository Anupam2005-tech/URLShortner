const express = require("express");
const URLrouter = require("./routers/URLrouters");
const Userrouter = require("./routers/Usersrouters");
const { mongoDBconnect } = require("./MongoDB");
const cors = require("cors");
const { urlencoded, cookieParser, checkSession } = require("./services/middleware");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors({
  origin:process.env.ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(urlencoded);
app.use(cookieParser);
app.use(express.json());

app.use("/url", checkSession, URLrouter);
app.use("/user", Userrouter);

app.get("/", (req, res) => {
  return res.json('hello');
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await mongoDBconnect(process.env.mongodbURL);
    console.log(" MongoDB connected");

    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
      });
    }
  } catch (err) {
    console.error(" MongoDB connection error:", err);
  }
};

startServer();

module.exports = app;
