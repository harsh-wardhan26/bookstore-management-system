import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    price: Number,
    category: String,
    stock: Number,
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
