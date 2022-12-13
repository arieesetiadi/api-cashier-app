import { Router } from "express";
import controller from "../controller/category.controller.js";

const router = Router();

// Index
router.get("/", controller.get);

// Store
router.post("/", controller.store);

export default router;
