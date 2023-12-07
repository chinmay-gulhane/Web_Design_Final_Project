// cartSlice.ts
import { FoodItem } from "@/interfaces/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../store";
import { CartItem } from "@/models/foodItem";
import { updateCartAction } from "../actions/cart-actions";

interface CartState {
  cart: CartItem[];
  loading: boolean;
  error: null | string;
}

const localStorageKey = "cart"; // Key for local storage

// Load cart state from local storage
const loadCartFromLocalStorage = (): CartState => {
  const storedCart = localStorage.getItem(localStorageKey);
  return storedCart ? JSON.parse(storedCart) : { cart: [] };
};

const initialState: CartState = {
  cart: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingCartItemIndex = state.cart.findIndex(
        (item) => item.foodItem._id === action.payload.foodItem._id
      );

      if (existingCartItemIndex !== -1) {
        state.cart[existingCartItemIndex].quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }

      // Save to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ foodItemId: string; quantity: number }>
    ) => {
      const { foodItemId, quantity } = action.payload;
      const existingCartItem = state.cart.find(
        (item) => item.foodItem._id === foodItemId
      );

      if (existingCartItem) {
        existingCartItem.quantity = quantity;
      }

      // Save to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (item) => item.foodItem._id !== action.payload
      );

      // Save to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
    clearCart: (state) => {
      state.cart = [];

      // Save to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCartAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCartAction.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload.cart;
      // state.user = action.payload.user;
      // state.token = action.payload.token;
    });
    builder.addCase(updateCartAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const {
  addToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
