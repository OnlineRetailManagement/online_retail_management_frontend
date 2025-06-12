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
  analytics: {},
};

const slice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
      state.analytics = {};
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.analytics = {};
    },

    getAnalyticsSuccess(state, action) {
      state.isLoading = false;
      state.analytics = action.payload;
      state.error = null;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

export function getAnalytics(usrRole) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/${usrRole}/statistics`);

      dispatch(slice.actions.getAnalyticsSuccess(response.data?.data ?? {}));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
