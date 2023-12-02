import orderRouter from "./order-route.js";
import userRouter from "./userRoute.js";
import restaurantRouter from "./restaurantRoute.js";
//below is default export so no need a name

export default (app) => {
  app.use("/auth", userRouter);
  app.use("/restaurant", restaurantRouter);
  app.use("/orders", orderRouter);
  app.use("/delivery", orderRouter);
};
