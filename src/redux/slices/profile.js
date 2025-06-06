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
  profile: {},
};

const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
      state.profile = {};
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      //   state.profile = {};
    },

    updateProfileSuccess(state, action) {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

export function updateProfile(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(
        `/public/profile/${payload.id}`,
        payload
      );

      dispatch(slice.actions.updateProfileSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
