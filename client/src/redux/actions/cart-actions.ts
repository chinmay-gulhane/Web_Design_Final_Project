import { updatePasswordPayLoadType } from "@/models/auth";
import { CartItem } from "@/models/foodItem";
import axiosInstance from "@/services/axios-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const userCartData = {
//     userId: userId,
//     cart: [CartItem]
// }

export const updateCartAction = createAsyncThunk(
  "cart/updateCart",
  async (cartData: { userId: String; cart: [CartItem] }) => {
    try {
      const response = await axiosInstance.patch(
        "/auth/update-password",
        cartData
      );
      const data = await response.data;
      if (data.success) {
        // window.location.replace("/login");
      }
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  }
);
