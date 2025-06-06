//

import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { dispatch } from "../store";

// ----------------------------------------

const initialState = {
  isLoading: false,
  isCreatedSuccess: false,
  error: null,
  products: [],
  product: {},
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.isCreatedSuccess = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    startCreating(state) {
      state.isLoading = true;
      state.isCreatedSuccess = false;
      state.product = {};
    },

    // CREATE PRODUCT
    createProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
      state.isCreatedSuccess = true;
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

      dispatch(slice.actions.getProductsSuccess(response.data?.data ?? {}));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createProduct(payload) {
  return async () => {
    dispatch(slice.actions.startCreating());
    try {
      const response = await axios.post("/admin/products", payload);

      dispatch(slice.actions.createProductSuccess(response.data?.data ?? {}));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
