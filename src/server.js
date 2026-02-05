import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/books", bookRoutes);
app.use("/api", authRoutes);
app.use("/api/orders", orderRoutes);

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
