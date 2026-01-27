const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// auth routes
app.use("/api", require("./routes/authRoutes"));

// book routes ✅ ADD THIS
app.use("/api/books", require("./routes/bookRoutes"));

app.use("/api/orders", require("./routes/orderRoutes"));


app.get("/", (req, res) => {
  res.send("Bookstore API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
