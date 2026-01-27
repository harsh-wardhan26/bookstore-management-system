const express = require("express");
const router = express.Router();

const {
  addBook,
  getBooks,
} = require("../controllers/bookController");

const { protect } = require("../middleware/authMiddleware");

// PROTECTED ROUTES 🔐
router.post("/", protect, addBook);
router.get("/", protect, getBooks);

module.exports = router;
