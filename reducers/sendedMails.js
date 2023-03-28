import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const sendedMailsSlice = createSlice({
    name: "sendedMails",
    initialState,
    reducers: {
        addSendedMail: (state, action) => {
            state.value.push(action.payload);
        },
    },
});

export const {addSendedMail} = sendedMailsSlice.actions;
export default sendedMailsSlice.reducer;