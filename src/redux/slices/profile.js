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
  profileupdate: false,

  // addresses
  isLoadingAdd: false,
  addError: null,
  isAddedNewAddress: false,
  isAddressUpdated: false,
  addresses: [],
  isDeletedAddress: false,

  // payment
  isLoadingPayment: false,
  isAddedPayment: false,
  isDeletedPayment: false,
  isPaymentError: null,
  payment: [],
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
      state.profileupdate = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      //   state.profile = {};
    },

    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.profile = action.payload;
    },

    // PUT PROFILE
    updateProfileSuccess(state, action) {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
      state.profileupdate = true;
    },

    //// ADDRESS
    // LOADING
    startLoadingAddress(state, action) {
      state.isLoadingAdd = true;
      state.addError = action.payload;
      // state.addresses = [];
      state.isAddedNewAddress = false;
      state.isDeletedAddress = false;
      state.isAddressUpdated = false;
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

    updateUserAddressSuccess(state, action) {
      state.isLoading = false;
      state.isAddressUpdated = true;
      state.addError = null;
    },

    updateUserAddressError(state, action) {
      state.isLoading = false;
      state.isAddressUpdated = false;
      state.addError = action.payload;
    },

    deleteUserAddressSuccess(state, action) {
      state.isLoadingAdd = false;
      state.addError = null;
      state.isDeletedAddress = true;
    },

    addUserAddressError(state, action) {
      state.isLoadingAdd = false;
      state.addError = action.payload;
      // state.addresses = [];
      state.isAddedNewAddress = false;
    },

    // PAYMENT
    startLoadingPayment(state, action) {
      state.isLoadingPayment = true;
      state.isAddedPayment = false;
      state.isPaymentError = null;
      state.isDeletedPayment = false;
    },

    getUserPaymentSuccess(state, action) {
      state.isLoadingPayment = false;
      state.payment = action.payload;
    },

    deleteUserPaymentSuccess(state, action) {
      state.isLoadingPayment = false;
      state.isDeletedPayment = true;
    },

    addUserPaymentSuccess(state, action) {
      state.isLoadingPayment = false;
      state.isAddedPayment = true;
      state.isPaymentError = null;
    },

    addUserPaymentError(state, action) {
      state.isLoadingPayment = false;
      state.isAddedPayment = false;
      state.isPaymentError = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

export function getProfile(userId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/public/profile/${userId}`);

      dispatch(slice.actions.getProfileSuccess(response?.data?.data?.user));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateProfile(payload, userId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/public/profile/${userId}`, payload);

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

// PUT
export function updateUserAddress(payload, addressId) {
  return async () => {
    dispatch(slice.actions.startLoadingAddress());
    try {
      const response = await axios.put(`/public/address/${addressId}`, payload);

      if (response?.data?.data?.updated_address?.id) {
        dispatch(slice.actions.updateUserAddressSuccess());
        toast.success("Your Address has been updated successfully ...!");
      }
    } catch (error) {
      dispatch(slice.actions.updateUserAddressError(error));
      toast.error("Oops, something went wrong while updating address ...!");
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

// ====== Payment ===
// GET
export function getUserPayment(userId) {
  return async () => {
    dispatch(slice.actions.startLoadingAddress());
    try {
      const response = await axios.get(`/public/payment/${userId}`);

      dispatch(
        slice.actions.getUserPaymentSuccess(response?.data?.data?.payments)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// POST
export function addPaymentAddress(payload) {
  return async () => {
    dispatch(slice.actions.startLoadingPayment());
    try {
      const response = await axios.post("/public/payment", payload);

      console.log(response.data);

      if (response?.data?.data?.id) {
        dispatch(slice.actions.addUserPaymentSuccess());
        toast.success("Your New Payment has been added successfully ...!");
      }
    } catch (error) {
      dispatch(slice.actions.addUserPaymentError(error));
      toast.error("Oops, something went wrong while adding new payment ...!");
    }
  };
}

// DELETE
export function deleteUserPayment(recordId) {
  return async () => {
    dispatch(slice.actions.startLoadingAddress());
    try {
      const response = await axios.delete(`/public/payment/${recordId}`);

      dispatch(
        slice.actions.deleteUserPaymentSuccess(response?.data?.data?.payments)
      );
      toast.success("Payment method is deleted successfully ...!");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.success("Oops, something went wrong while deleting ...!");
    }
  };
}
