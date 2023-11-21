import express from "express";
import { createRestaurantController, findRestaurantById } from "../controllers/Restaurant/restaurantController.js";

const router = express.Router();


router.post("/register", createRestaurantController);
router.route('/:id').get(findRestaurantById);

export default router;


