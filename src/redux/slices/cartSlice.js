import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basketItem: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.basketItem = action.payload;
    },
    totalItem(state, action) {
      state.totalItem = action.payload;
    },
    totalPrice(state, action) {
      state.totalPrice = action.payload;
    },
  },
});

export const { addItem, all } = cartSlice.actions;

export default cartSlice.reducer;
