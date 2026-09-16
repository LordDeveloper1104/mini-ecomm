import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";

// POST /api/cart
export const addToCart = async (req, res) => {
  try {
    const { sessionId, productId, quantity } = req.body;

    if (!sessionId || !productId) {
      return res.status(400).json({ message: "sessionId and productId are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

// GET /api/cart/:sessionId
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      sessionId: req.params.sessionId,
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json({ sessionId: req.params.sessionId, items: [] });
    }

    // calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    res.json({ ...cart.toObject(), total });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

// PUT /api/cart/:sessionId/item/:productId
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { sessionId, productId } = req.params;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.product");

    const total = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    res.json({ ...cart.toObject(), total });
  } catch (err) {
    res.status(500).json({ message: "Failed to update cart" });
  }
};

// DELETE /api/cart/:sessionId/item/:productId
export const removeCartItem = async (req, res) => {
  try {
    const { sessionId, productId } = req.params;

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.product");

    const total = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    res.json({ ...cart.toObject(), total });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};