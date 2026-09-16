import express from "express";
import {
  getProducts,
  getProductById,
  getCategories,
} from "../controllers/Product.controller.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;

