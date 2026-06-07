import { Router } from "express";
import { container } from "tsyringe";
import { AuthController } from "./auth.controller";
import { requestSchemaValidator } from "@/middleware/validator";
import { CreateUserSchema } from "./schemas";

const router = Router();

const controller = container.resolve(AuthController);

router.post("/signup", requestSchemaValidator(CreateUserSchema), controller.registerUser);

export default router;