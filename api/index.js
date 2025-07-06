// api/index.js

const app = require("../app"); // your main express app

// Vercel expects a default export of a function that handles requests
module.exports = async (req, res) => {
  // This ensures Express routes are only attached once
  const handleRequest = app;
  return handleRequest(req, res);
};