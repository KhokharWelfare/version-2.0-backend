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

app.use(cors({
  credentials: true,
  origin: [
    "http://localhost:5173",
    "https://www.khokharwelfarefoundaion.com"
  ]
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