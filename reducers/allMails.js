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
    handleUpdateArchived: (state, action) => {
      state.value = state.value.map((email) => {
        if (email._id === action.payload.emailId) {
          return { ...email, archived: action.payload.archivedStatus };
        }
        return email;
      });
    },
    deleteMail: (state, action) => {
      state.value = state.value.filter((email) => email._id !== action.payload);
    },
  },
});

export const {
  setAllMailsList,
  handleUpdateImportant,
  handleUpdateUnRead,
  handleUpdateFollowed,
  handleUpdateOnHold,
  deleteMail,
  handleUpdateArchived,
} = allMailsSlice.actions;
export default allMailsSlice.reducer;
