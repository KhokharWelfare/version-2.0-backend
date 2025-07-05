const express = require("express");
const router = express.Router();
const usageController = require("../controllers/usageController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", usageController.getAllUsage);

router.use(authMiddleware.protect, authMiddleware.restrictTo("admin"));

router.post(
  "/",
  upload.single("proof"),
  usageController.createUsage
);

router.get("/stats", usageController.getDashboardStats);

module.exports = router;