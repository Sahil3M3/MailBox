import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    mails: [],
    unread:0
  },
  reducers: {
    setMails(state, action) {
      state.mails = action.payload.mails; 
      state.unread=action.payload.unread;
      
    },
    addMail(state, action) {
      state.mails.push(action.payload); 
      
    },
    deleteMail(state, action) {
      state.mails = state.mails.filter((mail) => mail._id !== action.payload);
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
