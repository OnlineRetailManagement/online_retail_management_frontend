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
  users: [],

  vendors: [],
};

const slice = createSlice({
  name: "users",
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

    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    getVendorsSuccess(state, action) {
      state.isLoading = false;
      state.vendors = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

// ADMIN: GET USERS
export function getUsers(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/admin/users", {
        params: payload,
      });

      dispatch(slice.actions.getUsersSuccess(response.data?.data ?? {}));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ADMIN: GET VENDORS
export function getVendors(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/admin/vendors", {
        params: payload,
      });

      dispatch(slice.actions.getVendorsSuccess(response.data?.data ?? {}));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
