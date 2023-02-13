import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const allMailsSlice = createSlice({
  name: "allMails",
  initialState,
  reducers: {
    setAllMailsList: (state, action) => {
      state.value = action.payload;
      console.log("reducer allMails", action.payload);
    },
    handleUpdateImportant: (state, action) => {
      state.value = state.value.map((email) => {
        if (email._id === action.payload.emailId) {
          return { ...email, important: action.payload.importantStatus };
        }
        return email;
      });
    },
    handleUpdateUnRead: (state, action) => {
      state.value = state.value.map((email) => {
        if (email._id === action.payload.emailId) {
          return { ...email, unRead: action.payload.unReadStatus };
        }
        return email;
      });
    },
    handleUpdateFollowed: (state, action) => {
      state.value = state.value.map((email) => {
        if (email._id === action.payload.emailId) {
          return { ...email, followed: action.payload.followedStatus };
        }
        return email;
      });
    },
    handleUpdateOnHold: (state, action) => {
      state.value = state.value.map((email) => {
        if (email._id === action.payload.emailId) {
          return { ...email, onHold: action.payload.onHoldStatus };
        }
        return email;
      });
    },
  },
});

export const {
  setAllMailsList,
  handleUpdateImportant,
  handleUpdateUnRead,
  handleUpdateFollowed,
  handleUpdateOnHold,
} = allMailsSlice.actions;
export default allMailsSlice.reducer;
