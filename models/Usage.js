const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema({
  recipient: {
    type: String,
    required: [true, "Recipient name is required"],
  },
  amount: {
    type: Number,
    required: [true, "Please enter an amount"],
    min: [0.01, "Amount must be greater than zero"],
  },
  proof: {
    type: String,
    required: [true, "Please upload a proof image"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

usageSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Usage", usageSchema);