const Usage = require("../models/Usage");

exports.createUsage = async (req, res) => {
  const { recipient, amount } = req.body;
  const proof = req.file ? `/uploads/${req.file.filename}` : null;

  if (!recipient || !amount || !proof) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const usage = await Usage.create({ recipient, amount, proof });
  res.status(201).json({ status: "success", data: { usage } });
};

exports.getAllUsage = async (req, res) => {
  const usageHistory = await Usage.find().sort("-createdAt");
  res.status(200).json({ status: "success", data: { usageHistory } });
};

exports.getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalDonations = await Donation.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  const totalUsage = await Usage.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats: {
        users: totalUsers,
        donations: totalDonations[0]?.total || 0,
        usage: totalUsage[0]?.total || 0,
      },
    },
  });
};