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
  attachment: {},
};

const slice = createSlice({
  name: "attachments",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
      state.attachment = {};
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.attachment = {};
    },

    uploadAttachmentSuccess(state, action) {
      state.isLoading = false;
      state.attachment = action.payload;
      state.error = null;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

export function uploadAttachment(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/public/attachments", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(
        slice.actions.uploadAttachmentSuccess(
          response.data?.data?.attachment ?? {}
        )
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
