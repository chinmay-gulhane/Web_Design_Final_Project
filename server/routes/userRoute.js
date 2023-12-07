import express from "express";
import {
  getUsersController
} from "../controllers/user-controller/userController.js";
// import { userAuthenticationMiddleware } from "../middlewares/authMiddlerware.js";

const router = express.Router();

router.get("/getUsers", getUsersController);

export default router;
