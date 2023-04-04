import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const mailDisplayerSlice = createSlice({
  name: "mailDisplayer",
  initialState,
  reducers: {
    addMailToDisplay: (state, action) => {
      state.value = action.payload;
    },
    resetMailToDisplay: (state, action) => {
      state.value = {};
    },
  },
});

export const { addMailToDisplay, resetMailToDisplay } =
  mailDisplayerSlice.actions;
export default mailDisplayerSlice.reducer;
