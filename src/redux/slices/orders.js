//

import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { dispatch } from "../store";

// ----------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  orders: [],
};

const slice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
      state.orders = [];
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.orders = [];
    },

    // CHECKOUT SUCCESS
    getOrderProductsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.orders = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

export function getOrderProducts(userId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/user/orders", {
        params: { user_id: userId },
      });

      dispatch(
        slice.actions.getOrderProductsSuccess(
          response?.data?.data?.order_items ?? []
        )
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
