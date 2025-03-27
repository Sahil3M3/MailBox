import { createSlice } from "@reduxjs/toolkit";


const mailslice=createSlice({
    name:"mail",
    initialState:{
        mail:[],
    },
    reducers:{
        login(){
            console.log("hi");
            
        }

    }
})

export const mailAction=mailslice.actions;

export default mailslice.reducer;