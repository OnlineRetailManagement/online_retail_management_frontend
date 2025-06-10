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
  isDeletedAddress: false,
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
      state.isDeletedAddress = false;
    },

    getUserAddressSuccess(state, action) {
      state.isLoadingAdd = false;
      state.addError = null;
      state.addresses = action.payload;
    },

    addUserAddressSuccess(state, action) {
      state.isLoadingAdd = false;
      state.addError = null;
      state.isAddedNewAddress = true;
    },

    deleteUserAddressSuccess(state, action) {
      state.isLoadingAdd = false;
      state.addError = null;
      state.isDeletedAddress = true;
    },

    addUserAddressError(state, action) {
      state.isLoadingAdd = false;
      state.addError = action.payload;
      state.addresses = [];
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
export function getUserAddress(userId) {
  return async () => {
    dispatch(slice.actions.startLoadingAddress());
    try {
      const response = await axios.get(`/public/address/${userId}`);

      dispatch(
        slice.actions.getUserAddressSuccess(response?.data?.data?.addresses)
      );
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

// DELETE
export function deleteUserAddress(addressId) {
  return async () => {
    dispatch(slice.actions.startLoadingAddress());
    try {
      const response = await axios.delete(`/public/address/${addressId}`);

      dispatch(
        slice.actions.deleteUserAddressSuccess(response?.data?.data?.addresses)
      );
      toast.success("Address has been deleted successfully ...!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.success("Oops, something went wrong while deleting address ...!");
    }
  };
}
