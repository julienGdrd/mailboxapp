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
        const emailIndex = action.payload.findIndex(
          (payloadEmail) => payloadEmail._id === email._id
        );
        if (emailIndex !== -1) {
          return { ...email, important: !action.payload[emailIndex].important };
        }
        return email;
      });
    },
    handleUpdateUnRead: (state, action) => {
      state.value = state.value.map((email) => {
        const emailIndex = action.payload.findIndex(
          (payloadEmail) => payloadEmail._id === email._id
        );
        if (emailIndex !== -1) {
          return { ...email, unRead: !action.payload[emailIndex].unRead };
        }
        return email;
      });
    },
    handleUpdateFollowed: (state, action) => {
      state.value = state.value.map((email) => {
        const emailIndex = action.payload.findIndex(
          (payloadEmail) => payloadEmail._id === email._id
        );
        if (emailIndex !== -1) {
          return { ...email, followed: !action.payload[emailIndex].followed };
        }
        return email;
      });
    },
    handleUpdateOnHold: (state, action) => {
      state.value = state.value.map((email) => {
        const emailIndex = action.payload.findIndex(
          (payloadEmail) => payloadEmail._id === email._id
        );
        if (emailIndex !== -1) {
          return { ...email, onHold: !action.payload[emailIndex].onHold };
        }
        return email;
      });
    },
    handleUpdateArchived: (state, action) => {
      state.value = state.value.map((email) => {
        const emailIndex = action.payload.findIndex(
          (payloadEmail) => payloadEmail._id === email._id
        );
        if (emailIndex !== -1) {
          return { ...email, archived: !action.payload[emailIndex].archived };
        }
        return email;
      });
    },
    deleteMail: (state, action) => {
      const idsToDelete = action.payload.map((email) => email._id);
      state.value = state.value.filter((email) => !idsToDelete.includes(email._id));
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
