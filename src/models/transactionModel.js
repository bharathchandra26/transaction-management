const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transaction_id: { type: Number, required: true, unique: true },
  amount: { type: Number, required: true },
  transaction_type: { type: String, enum: ["DEPOSIT", "WITHDRAWAL"], required: true },
  user_id: { type: Number, required: true },
  status: { type: String, enum: ["PENDING", "COMPLETED", "FAILED"], default: "PENDING" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
