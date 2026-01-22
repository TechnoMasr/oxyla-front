import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logoutModal: false,
  requiredLoginModal: false,
  requiredVerifyEmailModal: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal(state, action) {
      const modalName = action.payload;
      state[modalName] = true;
    },

    closeModal(state, action) {
      const modalName = action.payload;
      state[modalName] = false;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
