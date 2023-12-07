import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  setOrderTotal,
  setTax,
  setDelivery,
  setTipPercentage,
  setCustomTip,
} from "@/redux/reducers/orderSlice";
import { RootState } from "@/redux/store";

const OrderSummary: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const orderTotal = useSelector((state: RootState) => state.order.orderTotal);
  const tax = useSelector((state: RootState) => state.order.tax);
  const delivery = useSelector((state: RootState) => state.order.delivery);
  const tipPercentage = useSelector(
    (state: RootState) => state.order.tipPercentage
  );
  const customTip = useSelector((state: RootState) => state.order.customTip);

  useEffect(() => {
    // Recalculate orderTotal, tax, and delivery whenever cartItems change
    let orderTotalInitial: number = 0;
    cartItems.forEach((cartItem) => {
      orderTotalInitial += cartItem.foodItem.price * cartItem.quantity;
    });

    // Dispatch actions to update the Redux store
    dispatch(setOrderTotal(orderTotalInitial));
    dispatch(setTax(orderTotalInitial * 0.05));
    dispatch(setDelivery(orderTotalInitial * 0.01));
  }, [cartItems, dispatch]);

  const handleTipChange = (percentage: number) => {
    dispatch(setTipPercentage(percentage));
    dispatch(setCustomTip("")); // Reset custom tip when a predefined percentage is selected
  };

  const handleCustomTipChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const customTipValue = event.target.value;
    dispatch(setCustomTip(customTipValue));
    dispatch(setTipPercentage(0)); // Reset tip percentage when a custom tip is entered
  };

  const calculateTipAmount = () => {
    if (customTip !== "") {
      return parseFloat(customTip);
    } else {
      return (orderTotal + tax + delivery) * (tipPercentage / 100);
    }
  };

  const calculateTotalAmount = () => {
    return orderTotal + tax + delivery + calculateTipAmount();
  };

  const handleCheckout = () => {
    // Perform checkout logic
    // You can dispatch additional actions or use the values directly
  };

  return (
    <div className="border rounded-5 p-5 h-100 border-gray-200 shadow-md hover:shadow-lg transition duration-300">
      <h3>Order Summary</h3>
      <div>
        <p>Order Total: ${orderTotal.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <p>Delivery: ${delivery.toFixed(2)}</p>
        <p>
          Tip:{" "}
          <>
            {"$"}
            <span>{(orderTotal * (tipPercentage / 100)).toFixed(2)}</span>
          </>
          <br />
          <select
            value={tipPercentage}
            onChange={(e) => handleTipChange(Number(e.target.value))}
          >
            <option value={0}>No Tip</option>
            <option value={5}>5%</option>
            <option value={10}>10%</option>
            <option value={20}>20%</option>
          </select>
          {tipPercentage === 0 && (
            <>
              {" or "}
              <input
                type="number"
                placeholder="Enter custom tip"
                value={customTip}
                onChange={handleCustomTipChange}
                className="w-10"
              />
              {"%"}
            </>
          )}
        </p>
      </div>
      <div>
        <p>Total: ${calculateTotalAmount().toFixed(2)}</p>
      </div>
      <Link href={`/checkout`}>
        <button
          className="bg-black text-white font-bold py-2 px-4 rounded-full"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </Link>
    </div>
  );
};

export default OrderSummary;
