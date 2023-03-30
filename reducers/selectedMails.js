import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const selectedMailsSlice = createSlice({
  name: "selectedMails",
  initialState,
  reducers: {
    addSelectedMail: (state, action) => {
      state.value.push(action.payload);
    },
    removeSelectedMail: (state, action) => {
      state.value = state.value.filter(
        (email) => email._id !== action.payload._id
      );
    },
    updateSelectAll: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addSelectedMail, removeSelectedMail, updateSelectAll } =
  selectedMailsSlice.actions;
export default selectedMailsSlice.reducer;
