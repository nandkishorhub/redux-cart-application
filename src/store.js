import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    //     // here we have given name cart
    //     // you can give anything you want
    //     // this cart property here comes with crucial role
    //     // while accessing state of assigned reducer
    //     // so here structure of state would be like
    // state: {
    //     cart: {
    //       cartItems: [],
    //       ammount: 0,
    //       total: 0,
    //       isLoading: false
    //     }
    //   }

    cart: cartReducer,
  },
});
