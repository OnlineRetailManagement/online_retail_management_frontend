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
  products: [],
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

export function getProducts(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/admin/products", {
        params: payload,
      });

      dispatch(slice.actions.getProductsSuccess(response.data?.data ?? []));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
