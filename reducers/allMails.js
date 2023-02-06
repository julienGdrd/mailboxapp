import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
  };

  export const allMailsSlice = createSlice({
    name: 'allMails',
    initialState,
    reducers: {
        setAllMailsList: (state, action) => {
            state.value = action.payload;
            console.log('reducer allMails', action.payload)
        },
        handleUpdateImportant: (state, action) => {
          console.log('hui', state.value)
          console.log('recu :', action.payload)
          state.value = state.value.map(email => {
            if (email._id === action.payload.emailId) {
              console.log('updating')
              return { ...email, important: action.payload.importantStatus };
            }
            return email;
          });
      },
    },
  });

  export const { setAllMailsList, handleUpdateImportant } = allMailsSlice.actions;
  export default allMailsSlice.reducer;