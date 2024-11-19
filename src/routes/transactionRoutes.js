const express = require("express");
const {
  createTransaction,
  getTransactionsByUser,
  updateTransactionStatus,
  getTransactionById,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/transactions", createTransaction);
router.get("/transactions", getTransactionsByUser);
router.put("/transactions/:transaction_id", updateTransactionStatus);
router.get("/transactions/:transaction_id", getTransactionById);

module.exports = router;
