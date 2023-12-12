// pages/checkout.tsx
import { clearCart } from "@/redux/reducers/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";

const CheckoutPage: React.FC = () => {
  // const dispatch = useDispatch();
  // dispatch(clearCart());
  return <div>Order is placed</div>;
};

export default CheckoutPage;
