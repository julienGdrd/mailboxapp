import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const byContactBoxUpdaterSlice = createSlice({
  name: "byContactBoxUpdater",
  initialState,
  reducers: {
    setContact: (state, action) => {
      state.value = action.payload;
      console.log("reducer byContact", action.payload);
    },
  },
});

export const { setContact } = byContactBoxUpdaterSlice.actions;
export default byContactBoxUpdaterSlice.reducer;
