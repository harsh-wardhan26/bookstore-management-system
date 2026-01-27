const express = require("express");
const router = express.Router();

const {
  addBook,
  getBooks,
} = require("../controllers/bookController");

// POST → add a book
router.post("/", addBook);

// GET → get all books
router.get("/", getBooks);

module.exports = router;
