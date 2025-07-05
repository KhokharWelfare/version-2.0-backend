const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Please enter an amount"],
    min: [0.01, "Amount must be greater than zero"],
  },
  proof: {
    type: String,
    required: [true, "Please upload a proof image"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: "30d" },
  },
});

donationSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Donation", donationSchema);