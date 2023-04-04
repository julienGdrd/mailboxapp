import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const activeTabsSlice = createSlice({
  name: "activeTabs",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setActiveTab } = activeTabsSlice.actions;
export default activeTabsSlice.reducer;
