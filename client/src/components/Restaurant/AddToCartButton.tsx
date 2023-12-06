import React, { useState } from "react";
import FoodItem from "@/models/foodItem";
import {
  addToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart,
} from "@/redux/reducers/cartSlice";
import CartComponent from "../Cart/CartComponent";
import { useDispatch } from "react-redux";
import store, { useAppSelector } from "@/redux/store";

interface AddToCartButtonProps {
  foodItem: FoodItem;
  foodItemQuantity: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  foodItem,
  foodItemQuantity,
}) => {
  const buttonStateInitial = foodItemQuantity === 0 ? "add" : "quantity";
  const [buttonState, setButtonState] = useState(buttonStateInitial); // 'add', 'quantity'
  const [quantity, setQuantity] = useState(foodItemQuantity);
  const dispatch = useDispatch();

  // console.log("check cart", quantity);

  const handleAddToCartButton = () => {
    if (buttonState === "add") {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity + 1;
        return newQuantity;
      });
      dispatch(addToCart({ foodItem: foodItem, quantity: 1 }));
      setButtonState("quantity");
    } else {
      // Handle adding to cart with the current quantity
      setButtonState("add"); // Reset back to 'add' state after adding to the cart
    }
  };

  const handleIncreaseQuantity = () => {
    // setQuantity(quantity + 1);
    // dispatch(updateCartItemQuantity({ foodItemId: foodItem._id, quantity }));

    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      dispatch(
        updateCartItemQuantity({
          foodItemId: foodItem._id,
          quantity: newQuantity,
        })
      );
      return newQuantity;
    });
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        dispatch(
          updateCartItemQuantity({
            foodItemId: foodItem._id,
            quantity: newQuantity,
          })
        );
        return newQuantity;
      });
    } else {
      // If quantity is 1, revert to 'add' state
      setButtonState("add");
      dispatch(removeItemFromCart(foodItem._id));
    }
  };

  return (
    <div>
      {buttonState === "quantity" && (
        <button
          className="h-10 px-6 font-semibold rounded-full bg-black text-white"
          onClick={handleDecreaseQuantity}
        >
          -
        </button>
      )}
      <button
        className="h-10 px-6 font-semibold rounded-full bg-black text-white"
        onClick={handleAddToCartButton}
      >
        {buttonState === "add" ? "Add" : `${quantity}`}
      </button>
      {buttonState === "quantity" && (
        <button
          className="h-10 px-6 font-semibold rounded-full bg-black text-white"
          onClick={handleIncreaseQuantity}
        >
          +
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
