const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// POST — Add a transaction
router.post("/", async (req, res) => {
  try {
    const { title, amount, type } = req.body;

    const transaction = new Transaction({
      title,
      amount,
      type,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to add transaction" });
  }
});

// GET — Fetch all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

module.exports = router;