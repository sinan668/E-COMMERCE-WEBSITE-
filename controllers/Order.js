const Order = require("../models/Order");
const CartItem = require("../models/CartItem");
const mongoose = require("mongoose");

exports.createOrder = async (req, res) => {
  try {
    const { userId, shippingAddress } = req.body;


    const cart = await CartItem.findOne({ userId: new mongoose.Types.ObjectId(userId) });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    //  Calculate total amount from cart items
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.quantity * item.price; // price must exist in cart
    }, 0);

    const newOrder = new Order({
      userId: cart.userId,
      items: cart.items, // We take items directly from cart
      totalAmount,
      shippingAddress,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();


    await CartItem.findOneAndDelete({ userId: userId });


    res.status(201).json({
      message: "Order placed successfully",
      orderId: savedOrder._id,
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
