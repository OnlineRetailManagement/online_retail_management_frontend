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
  profile: {},

  // addresses
  isLoadingAdd: false,
  addError: null,
  isAddedNewAddress: false,
  addresses: [],
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

    // PUT PROFILE
    updateProfileSuccess(state, action) {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
    },

    //// ADDRESS
    // LOADING
    startLoadingAddress(state, action) {
      state.isLoadingAdd = true;
      state.addError = action.payload;
      state.addresses = [];
      state.isAddedNewAddress = false;
    },

    addUserAddressSuccess(state, action) {
      state.isLoadingAdd = false;
      state.addError = null;
      state.isAddedNewAddress = true;
      // state.addresses = action.payload;
    },

    addUserAddressError(state, action) {
      state.isLoadingAdd = false;
      state.addError = action.payload;
      // state.addresses = null;
      state.isAddedNewAddress = false;
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

// ====== Address ===
// GET
export function getUserAddress(payload) {
  return async () => {
    dispatch(slice.actions.startLoadingAddress());
    try {
      const response = await axios.get("public/address", payload);

      dispatch(slice.actions.getUserAddressSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// POST
export function addUserAddress(payload) {
  return async () => {
    dispatch(slice.actions.startLoadingAddress());
    try {
      const response = await axios.post("/public/address", payload);

      if (response?.data?.data?.id) {
        dispatch(slice.actions.addUserAddressSuccess());
        toast.success("Your New Address has been added successfully ...!");
      }
    } catch (error) {
      dispatch(slice.actions.addUserAddressError(error));
      toast.error("Oops, something went wrong while adding new address ...!");
    }
  };
}
