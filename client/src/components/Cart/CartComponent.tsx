"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store"; // Replace with your actual path
import * as cartAction from "../../redux/reducers/cartSlice";
import AddToCartButton from "../Restaurant/AddToCartButton"; // Replace with the actual path
import FoodItem from "@/models/foodItem";
import Image from "next/image";
import FoodCard from "../FoodCard";

interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

const CartComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // const handleAddToCart = (foodItem: FoodItem, quantity: number) => {
  //   const existingCartItem = cartItems.find(
  //     (item) => item.foodItem._id === foodItem._id
  //   );

  //   if (existingCartItem) {
  //     // If the item is already in the cart, update the quantity
  //     dispatch(
  //       cartAction.updateCartItemQuantity({
  //         foodItemId: foodItem._id,
  //         quantity: quantity,
  //       })
  //     );
  //   } else {
  //     // If the item is not in the cart, add it
  //     dispatch(cartAction.addToCart({ foodItem, quantity }));
  //   }
  // };

  return (
    <div>
      {/* Check if the cart is empty */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {/* Iterate over your food items and render FoodCard for each */}
          <h2 className="text-xl font-semibold mb-2">Cart</h2>
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
        </>
      )}
    </div>
  );
};

export default CartComponent;
