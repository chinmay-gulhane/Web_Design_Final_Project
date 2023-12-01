import React, { useState } from "react";

const AddToCartButton = () => {
  const [buttonState, setButtonState] = useState("add"); // 'add', 'quantity'
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (buttonState === "add") {
      setButtonState("quantity");
    } else {
      // Handle adding to cart with the current quantity
      console.log(`Added ${quantity} items to the cart`);
      setButtonState("add"); // Reset back to 'add' state after adding to the cart
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      // If quantity is 1, revert to 'add' state
      setButtonState("add");
    }
  };

  return (
    <div>
      {buttonState === "quantity" && (
        <button
          className="h-10 px-6 font-semibold rounded-md bg-black text-white"
          onClick={handleDecreaseQuantity}
        >
          -
        </button>
      )}
      <button
        className="h-10 px-6 font-semibold rounded-full bg-black text-white"
        onClick={handleAddToCart}
      >
        {buttonState === "add" ? "Add to Cart" : `${quantity}`}
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
