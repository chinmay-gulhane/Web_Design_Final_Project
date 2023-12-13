import React from "react";
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
      <PizzaCanvas></PizzaCanvas>
    </div>
  );
};

export default CheckoutPage;
