import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { items, totalPrice } = req.body;

  const order = await Order.create({
    user: req.user._id,
    items,
    totalPrice,
  });

  res.status(201).json(order);
});

router.get("/", authMiddleware, async (req, res) => {
  const orders = await Order.find().populate("user");
  res.json(orders);
});

export default router;
