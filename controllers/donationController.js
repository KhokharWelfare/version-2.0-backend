const Donation = require("../models/Donation");

exports.createDonation = async (req, res) => {
  const { amount } = req.body;
  const proof = req.cloudinaryUrl || null;

  if (!amount || !proof) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const donation = await Donation.create({
      amount,
      proof,
      user: req.user._id,
    });
    res.status(201).json({ status: "success", data: { donation } });
  } catch (err) {
    res.status(500).json({ message: "Failed to create donation", error: err.message });
  }
};

exports.getMyDonations = async (req, res) => {
  const donations = await Donation.find({ user: req.user._id }).sort("-createdAt");
  res.status(200).json({ status: "success", data: { donations } });
};

exports.getAllDonations = async (req, res) => {
  const donations = await Donation.find().sort("-createdAt");
  res.status(200).json({ status: "success", data: { donations } });
};