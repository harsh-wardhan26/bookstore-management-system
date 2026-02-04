import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ================= CREATE ORDER (customer)
router.post("/", authMiddleware, async (req, res) => {
  const { items, totalPrice } = req.body;

  const order = await Order.create({
    user: req.user._id,
    items,
    totalPrice,
    status: "Pending",
  });

  res.status(201).json(order);
});


// ================= GET ALL ORDERS (admin)
router.get("/", authMiddleware, async (req, res) => {
  const orders = await Order.find().populate("user");
  res.json(orders);
});


// ================= UPDATE STATUS (admin)
router.put("/:id", authMiddleware, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(order);
});


export default router;
