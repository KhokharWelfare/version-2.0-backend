const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://www.khokharwelfarefoundaion.com"
];
app.use(cors({
  credentials: true,
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  }
}));



// Explicitly handle preflight requests for all routes
app.options('*', cors({
  credentials: true,
  origin: allowedOrigins
}));
// Connect to DB
connectDB();

// Routes
// app.post("/test", (req, res) => {
//   console.log("BODY:", req.body);
//   res.send(req.body);
// });
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/donations", require("./routes/donationRoutes"));
app.use("/api/usage", require("./routes/usageRoutes"));
app.use("/", (req, res)=> {
    res.send("Hello World");
})

module.exports = app;