import express from "express";
import { checkout } from "../controllers/Checkout.controller.js";

const router = express.Router();
router.post("/", checkout);

export default router;