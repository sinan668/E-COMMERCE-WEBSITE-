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


exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId: new mongoose.Types.ObjectId(userId) })
      .populate("items.productId", "name price imageUrl") // Show product details
      .sort({ createdAt: -1 }); // Latest orders first

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      count: orders.length,
      orders,
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate('userId', 'name email')
      .populate('items.productId', 'name price');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order details fetched successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

