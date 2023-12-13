import { AdminState } from "@/models/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AdminState = {
  loading: false,
  error: null,
  users: [],
  orders: [],
  restaurants: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    adminAction: (state, action) => {
      state.orders = action.payload.ordersData;
      state.restaurants = action.payload.restaurantData;
      state.users = action.payload.userData;
    },
    sortAction: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const adminActions = adminSlice.actions;

export default adminSlice.reducer;
