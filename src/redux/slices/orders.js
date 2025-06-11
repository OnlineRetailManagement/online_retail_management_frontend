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
  orders: [],

  isOrderUpdated: false,
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
      state.isOrderUpdated = false;
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

    // UPDATE SUCCESS
    updateOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.isOrderUpdated = true;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

// GET: [ACCESSIBILITY: USER, VENDOR]
export function getOrder(userId, isActiveOrder, userRole) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/${userRole}/orders`, {
        params: { user_id: userId, is_active: isActiveOrder },
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

// PUT: [ACCESSIBILITY: VENDOR]
export function updateOrder(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put("/vendor/orders", null, {
        params: payload,
      });

      dispatch(slice.actions.updateOrderSuccess(response?.data?.data));
      toast.success("Order status updated successfully ...!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error("Oops, something went wrong while updating ...!");
    }
  };
}
