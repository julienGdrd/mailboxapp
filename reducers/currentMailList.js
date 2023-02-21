import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const currentMailListSlice = createSlice({
  name: "currentMailList",
  initialState,
  reducers: {
    addCurrentList: (state, action) => {
        state.value= action.payload
        console.log('currentListReducer',action.payload)
    },
  },
});

export const { addCurrentList } = currentMailListSlice.actions;
export default currentMailListSlice.reducer;
