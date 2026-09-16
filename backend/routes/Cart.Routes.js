import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/Cart.controller.js";

const router = express.Router();

router.post("/", addToCart);
router.get("/:sessionId", getCart);
router.put("/:sessionId/item/:productId", updateCartItem);
router.delete("/:sessionId/item/:productId", removeCartItem);

export default router;