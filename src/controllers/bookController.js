import Book from "../models/Book.js";


// ================= ADD BOOK (Admin) =================
export const addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ================= GET ALL BOOKS (WITH PAGINATION) ⭐ UPDATED =================
export const getBooks = async (req, res) => {
  try {
    // page & limit from query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    // total count for page calculation
    const total = await Book.countDocuments();

    // fetch only required books
    const books = await Book.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // newest first (optional but nice)

    res.json({
      books,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET SINGLE BOOK =================
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch {
    res.status(400).json({ message: "Invalid book ID" });
  }
};


// ================= UPDATE BOOK =================
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ================= DELETE BOOK =================
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
