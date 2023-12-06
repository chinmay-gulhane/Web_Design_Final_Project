// cartSlice.ts
import { FoodItem } from "@/interfaces/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../store";

interface CartState {
  items: CartItem[];
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      if (state.items.includes(action.payload)) {
      } else {
        state.items = [...state.items, action.payload];
      }
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ foodItemId: string; quantity: number }>
    ) => {
      const { foodItemId, quantity } = action.payload;
      const existingCartItem = state.items.find(
        (item) => item.foodItem._id === foodItemId
      );
      if (existingCartItem) {
        existingCartItem.quantity = quantity;
      }
      // console.log(state.items);
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.foodItem._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
