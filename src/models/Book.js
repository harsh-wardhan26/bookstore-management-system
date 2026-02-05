import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
