import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  // here ammount means no of quantity of particular
  // item in cart
  ammount: 0,
  total: 0,
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  // case reducer
  reducers: {},
});

export default cartSlice.reducer;
