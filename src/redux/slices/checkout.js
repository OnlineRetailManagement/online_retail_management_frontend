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
  checkoutResponse: {},
};

const slice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
      state.checkoutResponse = {};
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.checkoutResponse = {};
    },

    // CHECKOUT SUCCESS
    checkOutSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.checkoutResponse = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

export function userCheckout(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/user/order-checkout", payload);

      dispatch(slice.actions.checkOutSuccess(response.data ?? {}));
      toast.success("Your Order has been placed successfully ...!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error("Oops, something went wrong while placing order ...!");
    }
  };
}
