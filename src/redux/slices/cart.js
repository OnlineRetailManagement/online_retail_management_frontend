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

  isUpdateLoading: false,
  isUpdateQntSuccess: false,

  isDeletionSuccess: false,
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
      state.isUpdateLoading = false;
      state.isUpdateQntSuccess = false;
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

    // UPDATE CART QUANTITY
    startUpdateLoading(state, action) {
      state.isUpdateLoading = true;
      state.isUpdateQntSuccess = false;
      state.isDeletionSuccess = false;
    },

    updateCartQuantitySuccess(state, action) {
      state.isUpdateLoading = false;
      state.isUpdateQntSuccess = true;
    },

    deleteCartItemSuccess(state, action) {
      state.isDeletionSuccess = true;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

// GET
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

// POST
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

// PUT
export function updateCartQuantity(payload, cartId) {
  return async () => {
    dispatch(slice.actions.startUpdateLoading());
    try {
      const response = await axios.put(`/user/cart/${cartId}`, payload);

      dispatch(
        slice.actions.updateCartQuantitySuccess(response.data?.data ?? {})
      );
      toast.success("Quantity updated successfully ...!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(
        "Oops, something went wrong updating the quantity of cart ...!"
      );
    }
  };
}

// DELETE
export function deleteCartItem(cartId) {
  return async () => {
    dispatch(slice.actions.startUpdateLoading());
    try {
      const response = await axios.delete(`/user/cart/${cartId}`);

      dispatch(slice.actions.deleteCartItemSuccess(response.data?.data ?? {}));
      toast.success("Item removed from cart successfully ...!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(
        "Oops, something went wrong while removing the cart item ...!"
      );
    }
  };
}
