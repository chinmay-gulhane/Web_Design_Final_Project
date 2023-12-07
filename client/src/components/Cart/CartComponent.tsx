"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, useAppSelector } from "../../redux/store"; // Replace with your actual path
import * as cartAction from "../../redux/reducers/cartSlice";
import AddToCartButton from "../Restaurant/AddToCartButton"; // Replace with the actual path
import FoodItem from "@/models/foodItem";
import Image from "next/image";
import FoodCard from "../FoodCard";
import OrderSummary from "../OrderSummary/OrderSummary";

interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

const CartComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  return (
    <div>
      {/* Check if the cart is empty */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {/* Iterate over your food items and render FoodCard for each */}
          <h1 className="text-xl font-semibold mb-2">Cart Summary</h1>
          <div className="flex justify-between gap-lg-5">
            <div className="vw-100">
              {cartItems.map((cartItem) => (
                <FoodCard
                  key={cartItem.foodItem._id}
                  foodItem={cartItem.foodItem}
                  foodQuantity={cartItem.quantity}
                />
                // <div key={cartItem.foodItem._id} className="mb-2">
                //   <h3 className="text-lg font-semibold">{cartItem.foodItem.name}</h3>
                //   <p className="text-gray-600">${cartItem.foodItem.price}</p>
                // </div>
              ))}
            </div>
            {/* Order summary */}
            <div className="">
              <OrderSummary />
            </div>
          </div>
          {/* <div></div> */}
        </>
      )}
    </div>
  );
};

export default CartComponent;
