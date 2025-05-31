const express = require("express");
const URLrouter = require("./routers/URLrouters");
const Userrouter = require("./routers/Usersrouters");
const { mongoDBconnect } = require("./MongoDB");
const cors = require("cors");
const { urlencoded, cookieParser, checkSession } = require("./services/middleware");

const app = express();

// === CORS CONFIGURATION ===
app.use(
  cors({
    origin: [
      "http://localhost:5173",               // Local Dev
      "https://quicklink-liard.vercel.app"   // Deployed Frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// === LOG INCOMING REQUESTS (OPTIONAL, FOR DEBUGGING) ===
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} from ${req.headers.origin}`);
  next();
});

app.use(urlencoded);
app.use(cookieParser);


app.use("/url", checkSession, URLrouter);
app.use("/user", Userrouter);



mongoDBconnect(process.env.mongodbURL)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
