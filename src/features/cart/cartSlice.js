import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  // here amount means total no. of items in cart
  amount: 0,
  total: 0,
  isLoading: false,
  apiError: "",
};

// Asynchronously fetching cartItems
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  // here first param is what ever data passed from component
  // but we are not using that so we have made it void using '_'
  async (_, thunkAPI) => {
    try {
      const resp = await axios(url);
      // here using second param to callback function
      // we can get access to entire application store using it's getState function
      // console.log(thunkAPI.getState());
      // we can dispatch action to another reducer/slice
      //thunkAPI.dispatch(openModal())
      // axios response store in data so always access response from data property
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong, contact admin");
    }
    // we can use fetch instead like below
    // return await fetch(url)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .catch((error) => {
    //     // Your error is here!
    //     console.log("error => ", error);
    //   });
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  // Case reducer
  reducers: {
    // here we are directly mutating state
    // immer lib internally take care of state update
    // and make sure of immumtable update of state
    // it means , immer lib merge state's remaining data with this update safely
    // here we do not need to return state it also handled internally
    // if you want to return value from reducer functio then write code below
    //  clearCart: (state) => void (state.cartItems=[])
    // more info check this => https://stackoverflow.com/questions/60806105
    //error-an-immer-producer-returned-a-new-value-and-modified-its-draft-either-r

    // one more thing we can return state like this without ading void and all
    //clearCart: (state) => {
    // return { ...initialState, cartItems: [] };
    // },
    // but we have to take care of immutation using spread opertaor in order to
    // preserve state data
    // but if you are updating state like state.cartItems
    // so immer will auotmatically identify that you are ready to given responsibilty to it
    // so that time there is no need to return it will be taken care by immer

    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, { payload }) => {
      const itmeId = payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itmeId);
    },
    incrementItem: (state, { payload }) => {
      const itmeId = payload;
      const cartItem = state.cartItems.find((item) => item.id === itmeId);
      cartItem.amount++;
    },
    decrementItem: (state, { payload }) => {
      const itmeId = payload;
      const cartItem = state.cartItems.find((item) => item.id === itmeId);
      // here we have extracted one item from cartitem array of state
      // and we have updated that item's amount
      // and you can see immer has power to merge that single item into cartitems array
      // so here you can see immer can do nested merging for us and that is brilliant/
      // it is happening because we have extracted that cartItem from state by writing
      //state.cartItems and looping over that so it keep track of that item and
      // make sure to update that item backto cartItems array
      // if you directly pass cartItem in payload then it will not auto mereging for you
      // as it doesn't track it as a part of cartitems array rather it would treat it as any random
      // object
      cartItem.amount--;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  // here we handle all async activities from createAsyncThunk
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, { payload }) => {
      state.apiError = payload;
      state.isLoading = false;
    },
  },
});

export const {
  clearCart,
  removeItem,
  incrementItem,
  decrementItem,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
