import { Router } from "express";
import controller from "../controller/auth.controller.js";

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/refresh-token", controller.refreshToken);

export default router;
