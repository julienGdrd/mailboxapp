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
    },
    addSendedMail: (state, action) => {
      state.value.push(action.payload);
    },
    updateDraft: (state, action) => {
      state.value = state.value.map((mail) => {
        if (mail._id === action.payload._id) {
          return action.payload;
        } else {
          return mail;
        }
      });
    },
    updateBooleenValueByKey: (state, action) => {
      const keysOnlyOneCanBeTrue = [
        "pro",
        "perso",
        "onHold",
        "spam",
        "principal",
        "promotion",
        "reseaux",
      ];
      if (Object.keys(action.payload).length >= 3) {
        // FORCE booleen by key
        state.value = state.value.map((email) => {
          const emailIndex = action.payload.selectedArr.findIndex(
            (payloadEmail) => payloadEmail._id === email._id
          );
          if (emailIndex !== -1) {
            const updatedEmail = { ...email };
            updatedEmail[action.payload.keyToUpdate] =
              action.payload.forcedValue;
            if (keysOnlyOneCanBeTrue.includes(action.payload.keyToUpdate)) {
              keysOnlyOneCanBeTrue.forEach((key) => {
                if (key !== action.payload.keyToUpdate) {
                  updatedEmail[key] = false;
                }
              });
            }
            // onholdDate
            if (action.payload.keyToUpdate === "onHold") {
              updatedEmail["onHoldDate"] = action.payload.holdDate;
            }
            // onholdDate
            return updatedEmail;
          }
          return email;
        });
      } else if (Object.keys(action.payload).length === 2) {
        // TOGGLE booleen by key
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
            if (keysOnlyOneCanBeTrue.includes(action.payload.keyToUpdate)) {
              keysOnlyOneCanBeTrue.forEach((key) => {
                if (key !== action.payload.keyToUpdate) {
                  updatedEmail[key] = false;
                }
              });
            }
            return updatedEmail;
          }
          return email;
        });
      }
    },
    deleteMail: (state, action) => {
      const idsToDelete = action.payload.map((email) => email._id);
      state.value = state.value.filter(
        (email) => !idsToDelete.includes(email._id)
      );
    },
  },
});

export const {
  setAllMailsList,
  addSendedMail,
  updateDraft,
  deleteMail,
  updateBooleenValueByKey,
} = allMailsSlice.actions;
export default allMailsSlice.reducer;
