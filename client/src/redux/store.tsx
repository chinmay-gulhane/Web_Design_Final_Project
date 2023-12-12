import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import cartReducer from "./reducers/cartSlice";
import orderReducer from "./reducers/orderSlice";
import restaurantReducer from "./reducers/restaurantSlice";
import thunk from "redux-thunk";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartReducer,
    order: orderReducer,
    restaurant: restaurantReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Dispatch the fetchRestaurants action when the store is initialized
// store.dispatch(fetchRestaurants());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
