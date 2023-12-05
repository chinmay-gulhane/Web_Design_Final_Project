import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import cartReducer from "./reducers/cartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
