const Donation = require("../models/Donation");

exports.createDonation = async (req, res) => {
  const { amount } = req.body;
  const proof = req.file ? `/uploads/${req.file.filename}` : null;

  if (!amount || !proof) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const donation = await Donation.create({
    amount,
    proof,
    user: req.user._id,
  });

  res.status(201).json({ status: "success", data: { donation } });
};

exports.getMyDonations = async (req, res) => {
  const donations = await Donation.find({ user: req.user._id }).sort("-createdAt");
  res.status(200).json({ status: "success", data: { donations } });
};

exports.getAllDonations = async (req, res) => {
  const donations = await Donation.find().sort("-createdAt");
  res.status(200).json({ status: "success", data: { donations } });
};