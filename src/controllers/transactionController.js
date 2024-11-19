const Transaction = require("../models/transactionModel");
const Counter = require("../models/countersModel");

// Get the next sequence number for a given counter
const getNextSequence = async (counterName) => {
  const counter = await Counter.findOneAndUpdate(
    { name: counterName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { amount, transaction_type, user_id } = req.body;

    // Validate request
    if (!amount || !transaction_type || !user_id) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Generate sequential transaction ID
    const transaction_id = await getNextSequence("transaction_id");

    // Create transaction
    const transaction = new Transaction({
      transaction_id,
      amount,
      transaction_type,
      user_id,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all transactions for a user
const getTransactionsByUser = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required." });
    }

    const transactions = await Transaction.find({ user_id });
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update the status of a transaction
const updateTransactionStatus = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const { status } = req.body;

    if (!status || !["COMPLETED", "FAILED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { transaction_id },
      { status },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific transaction
const getTransactionById = async (req, res) => {
  try {
    const { transaction_id } = req.params;

    const transaction = await Transaction.findOne({ transaction_id });
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactionsByUser,
  updateTransactionStatus,
  getTransactionById,
};
