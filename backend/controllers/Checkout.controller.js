import mongoose from "mongoose";
import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";
import Order from "../models/Order.model.js";

// POST /api/checkout
export const checkout = async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ message: "sessionId is required" });
  }

  const cart = await Cart.findOne({ sessionId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const decrementedProductIds = []; // for rollback if something fails midway

  try {
    for (const item of cart.items) {
      // Atomic: only succeeds if enough stock exists at the moment of update
      const updated = await Product.findOneAndUpdate(
        { _id: item.product._id, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { new: true },
      );

      if (!updated) {
        // Not enough stock for this item — roll back everything decremented so far
        await rollback(decrementedProductIds);
        return res.status(409).json({
          message: `Not enough stock for "${item.product.name}". Please update your cart.`,
        });
      }

      decrementedProductIds.push({ id: item.product._id, qty: item.quantity });
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const order = await Order.create({
      sessionId,
      items: cart.items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      total,
    });

    // Clear the cart after a successful order
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    await rollback(decrementedProductIds);
    res.status(500).json({ message: "Checkout failed" });
  }
};

// Restore stock for items already decremented before the failure point
async function rollback(decrementedProductIds) {
  for (const { id, qty } of decrementedProductIds) {
    await Product.findByIdAndUpdate(id, { $inc: { stock: qty } });
  }
}
