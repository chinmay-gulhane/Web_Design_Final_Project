import React, { useState } from "react";
import FoodItem from "@/models/foodItem";
import {
  addToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart,
  attachUserToCart,
} from "@/redux/reducers/cartSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { Modal, Tooltip } from "react-bootstrap";
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
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  // const user = useAppSelector((state) => state.auth.user);
  // const cart = useAppSelector((state) => state.cart.cart);
  // const cartUserId = useAppSelector((state) => state.cart.userId);
  const dispatch = useDispatch();
  const handleAddToCartButton = () => {
    if (buttonState === "add") {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity + 1;
        return newQuantity;
      });
      dispatch(addToCart({ foodItem: foodItem, quantity: 5 }));
      setButtonState("quantity");
    }
    // } else {
    //   // Handle adding to cart with the current quantity
    //   setButtonState("add"); // Reset back to 'add' state after adding to the cart
    // }
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
      setShouldShowPopup(true);
      // setButtonState("add");
      // dispatch(removeItemFromCart(foodItem._id));
    }
  };
  const handlePopupClose = () => setShouldShowPopup(false);
  const handleRemoveFromCart = () => {
    setQuantity(0);
    dispatch(removeItemFromCart(foodItem._id));
    // dispatch(updateCartAction({ userId: user?._id, cart: cart }));
    setShouldShowPopup(false);
    setButtonState("add");
  };
  return (
    <>
      {/* <div> */}
      {/* {buttonState === "quantity" && (
        <button
          // className="h-10 border-0 font-semibold rounded-start-circle bg-black text-white"
          onClick={handleDecreaseQuantity}
        >
          -
        </button>
      )} */}
      <button
        className={`flex p-2 text-center text-white bg-black rounded-2xl border-0 w-2/3 font-semibold ${
          buttonState === "add" ? "justify-center" : "justify-between"
        }`}
        // className={`h-10 px-4 text-center font-semibold border-0 bg-black text-white ${
        //   buttonState === "add" ? "rounded-full w-75" : "border-0 w-50"
        // }`}
        onClick={handleAddToCartButton}
      >
        {buttonState === "quantity" && (
          <button
            className="text-white bg-black  font-semibold border-0"
            // className="h-10 border-0 font-semibold rounded-start-circle bg-black text-white"
            onClick={handleDecreaseQuantity}
          >
            -
          </button>
        )}
        {buttonState === "add" ? "Add" : `${quantity}`}
        {buttonState === "quantity" && (
          <button
            className="text-white bg-black  font-semibold border-0"
            // className="h-10 border-0 font-semibold rounded-end-circle bg-black text-white"
            onClick={handleIncreaseQuantity}
          >
            +
          </button>
        )}
      </button>
      {/* {buttonState === "quantity" && (
        <button
          // className="h-10 border-0 font-semibold rounded-end-circle bg-black text-white"
          onClick={handleIncreaseQuantity}
        >
          +
        </button>
      )} */}
      {/* </div> */}
      <Modal
        className="p-5 rounded-3 mt-2"
        show={shouldShowPopup}
        size="sm"
        onHide={handlePopupClose}
        backdrop={"static"}
      >
        <Modal.Header className="d-flex justify-content-between">
          <h4 className="fw-bold">Remove from cart?</h4>
          <span className="fs-3 cursor-pointer" onClick={handlePopupClose}>
            &times;
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center flex-row">
            <button
              className="btn btn-sm btn-danger p-2 m-2 w-25"
              onClick={handleRemoveFromCart}
            >
              Yes
            </button>
            <button
              className="btn btn-sm btn-success p-2 m-2 w-25"
              onClick={handlePopupClose}
            >
              No
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddToCartButton;
