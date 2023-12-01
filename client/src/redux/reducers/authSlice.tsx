import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface AuthState {
  loading: boolean;
  user: null;
  token: null | string;
  error: null | string;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  token: null,
  error: null,
};


const authSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    logOut: (state, action: PayloadAction<string>) => {
      
    },
    logIn: (state, action: PayloadAction) => {
      return state;
    }
  },
  extraReducers: (builder) => {},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;