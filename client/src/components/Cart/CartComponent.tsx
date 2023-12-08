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
import Spinner from "../Spinner/Spinner";

interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

const CartComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.cart);
  const cartItemsLoading = useAppSelector(
    (state: RootState) => state.cart.loading
  );

  return (
    <>
      {cartItemsLoading ? (
        <Spinner />
      ) : (
        <div>
          {/* Check if the cart is empty */}
          {cartItems.length === 0 ? (
            <h1 className="text-center font-semibold mb-2 vh-100">
              Your cart is empty
            </h1>
          ) : (
            <>
              {/* Iterate over your food items and render FoodCard for each */}
              <h1 className="text-center font-semibold mb-2">Cart Summary</h1>
              <div className="flex justify-content-around flex-wrap gap-lg-5 m-5">
                <div className="flex-grow-1">
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
                <div className="flex-lg-shrink-0">
                  <OrderSummary />
                </div>
              </div>
              {/* <div></div> */}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CartComponent;
