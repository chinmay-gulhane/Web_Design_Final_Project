// pages/checkout.tsx
import { clearCart } from "@/redux/reducers/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";
import Title from "@/components/Title";
import PizzaCanvas from "@/components/Restaurant/Pizza";

const CheckoutPage: React.FC = () => {
  // const dispatch = useDispatch();
  // dispatch(clearCart());
  return (
    <div className="text-center">
      <Title title="Your order has been placed successfull." variant="h3" />
      <p>
        Congratulations! You&apos;ve successfully embarked on a journey to
        flavor town. Your order is on its way, prepared with love and a dash of
        magic.
      </p>
      {/* <span>Your order has been placed successfull
        Thankyou for your order. The restaurant will deliver your food at the
        earliest.
      </span> */}
      <PizzaCanvas></PizzaCanvas>
    </div>
  );
};

export default CheckoutPage;
