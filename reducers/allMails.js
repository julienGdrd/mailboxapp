import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const allMailsSlice = createSlice({
  name: "allMails",
  initialState,
  reducers: {
    setAllMailsList: (state, action) => {
      const sortedEmails = action.payload.sort(
        (a, b) => new Date(b.deliveryDate) - new Date(a.deliveryDate)
      );
      state.value = sortedEmails;
      console.log("reducer allMails", action.payload);
    },
    updateBooleenValueByKey: (state, action) => {
      if (Object.keys(action.payload).length === 3) {
        // Force booleen by key
        state.value = state.value.map((email) => {
          const emailIndex = action.payload.selectedArr.findIndex(
            (payloadEmail) => payloadEmail._id === email._id
          );
          if (emailIndex !== -1) {
            const updatedEmail = { ...email };
            updatedEmail[action.payload.keyToUpdate] =
              action.payload.forcedValue;
            return updatedEmail;
          }
          return email;
        });
      } else if (Object.keys(action.payload).length === 2) {
        // Toggle booleen by key
        state.value = state.value.map((email) => {
          const emailIndex = action.payload.selectedArr.findIndex(
            (payloadEmail) => payloadEmail._id === email._id
          );
          if (emailIndex !== -1) {
            const updatedEmail = { ...email };
            updatedEmail[action.payload.keyToUpdate] =
              !action.payload.selectedArr[emailIndex][
                action.payload.keyToUpdate
              ];
            return updatedEmail;
          }
          return email;
        });
      }
      console.log("number of keys :", Object.keys(action.payload).length);
    },
    deleteMail: (state, action) => {
      const idsToDelete = action.payload.map((email) => email._id);
      state.value = state.value.filter(
        (email) => !idsToDelete.includes(email._id)
      );
    },
  },
});

export const { setAllMailsList, deleteMail, updateBooleenValueByKey } =
  allMailsSlice.actions;
export default allMailsSlice.reducer;
