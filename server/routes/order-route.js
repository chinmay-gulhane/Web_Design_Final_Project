import express from "express";
import * as orderController from "../controllers/order/order-controller.js";

const router = express.Router();
//imports controller and initialize object
//registering the routes.
//if http req method is get then find will be invoked
router.route("/").get(orderController.find).post(orderController.post);

router
  .route("/:id")
  .get(orderController.get)
  .put(orderController.put)
  .delete(orderController.remove);

router.route("/search").get(orderController.search);

export default router;
