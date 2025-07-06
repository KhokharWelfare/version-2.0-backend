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
// Use official CORS middleware for robust handling
// const corsOptions = {
//   origin: function(origin, callback) {
//     // Allow requests with no origin (like mobile apps, curl, etc.)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       // Instead of throwing, just deny with false (no CORS headers)
//       return callback(null, false);
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization", "Set-Cookie"]
// };
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie");
//   }
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });



// Configure CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization", "Set-Cookie"]
};

// Use CORS middleware globally
app.use(cors(corsOptions));

// Optional: Add fallback OPTIONS route handler
app.options("*", cors(corsOptions)); // Reflect same settings for all preflight requests



// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie');
//   }
//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }
//   next();
// });

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

// Global handler for all OPTIONS requests to ensure CORS headers are always set
app.options("*", cors(corsOptions));

app.use("/", (req, res)=> {
    res.send("Hello World");
})

module.exports = app;