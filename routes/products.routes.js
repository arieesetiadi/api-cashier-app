import { Router } from "express";
import controller from "../controller/product.controller.js";

const router = Router();

// Get Products
router.get("/", controller.get);

// Store Product
router.post("/", controller.store);

// Update Product
router.put("/", controller.update);

// Delete Product
router.delete("/", controller.delete);

export default router;
