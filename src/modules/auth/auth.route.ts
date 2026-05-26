import { Router } from "express";
import { container } from "tsyringe";
import { AuthController } from "./auth.controller";

const router = Router();

const controller = container.resolve(AuthController);
router.post("/signup", controller.registerUser);

export default router;