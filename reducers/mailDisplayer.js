import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: {},
};

export const mailDisplayerSlice = createSlice({
  name: 'mailDisplayer',
  initialState,
  reducers: {
    addMailToDisplay: (state, action) => {
      state.value = action.payload;
      console.log('reducer reached', action.payload)
    },
    resetMailToDisplay: (state, action) => {
      state.value = {}
      console.log('reducer reset')
    }
  },
});

export const { addMailToDisplay, resetMailToDisplay } = mailDisplayerSlice.actions;
export default mailDisplayerSlice.reducer;