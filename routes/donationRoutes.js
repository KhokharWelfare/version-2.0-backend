const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.use(authMiddleware.protect);

const cloudinaryUpload = require("../middleware/cloudinaryUpload");

router.post(
  "/",
  upload.single("proof"),
  cloudinaryUpload,
  donationController.createDonation
);

router.get("/me", donationController.getMyDonations);

router.get("/", authMiddleware.restrictTo("admin"), donationController.getAllDonations);

module.exports = router;