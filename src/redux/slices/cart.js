//

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
// utils
import axios from "../../utils/axios";
//
import { dispatch } from "../store";

// ----------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  cart: {},
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
      state.cart = {};
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET CART RECORDS
    getCartRecordSuccess(state, action) {
      state.isLoading = false;
      state.cart = action.payload;
    },

    // ADD TO CART
    addToCartSuccess(state, action) {
      state.isLoading = false;
      state.cart = action.payload;
      state.error = null;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

export function getCartRecord(userId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/user/cart/${userId}`);

      dispatch(slice.actions.getCartRecordSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addToCart(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/user/cart", payload);

      dispatch(slice.actions.addToCartSuccess(response.data?.data ?? {}));
      toast.success("Added to cart successfully ...!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error("Oops, something went wrong while adding to cart ...!");
    }
  };
}
