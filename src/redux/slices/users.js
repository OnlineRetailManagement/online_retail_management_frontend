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
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

export function getUsers(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // WARNING: it should be GET method ...
      const response = await axios.post("/admin/get-all-users", payload);

      // WARNING: "Users" or any keys should be in smallCase ...
      dispatch(slice.actions.getUsersSuccess(response.data?.data?.Users ?? []));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
