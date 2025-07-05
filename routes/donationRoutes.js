const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.use(authMiddleware.protect);

router.post(
  "/",
  upload.single("proof"),
  donationController.createDonation
);

router.get("/me", donationController.getMyDonations);

router.get("/", authMiddleware.restrictTo("admin"), donationController.getAllDonations);

module.exports = router;