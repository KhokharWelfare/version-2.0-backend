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
// Custom CORS middleware for Vercel compatibility
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie');
  }
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});
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