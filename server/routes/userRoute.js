import express from "express";
import { loginController, registerController } from "../controllers/authController.js";
import { userAuthenticationMiddleware } from "../middlewares/authMiddlerware.js"

const router = express.Router();


router.post("/register", registerController);
router.post("/login", loginController);

export default router;


