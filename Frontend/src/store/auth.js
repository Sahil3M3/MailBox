import { createSlice } from "@reduxjs/toolkit";
import Login from "../pages/Login";


const authSlice=createSlice({
    name:"auth",
    initialState:{
        token:localStorage.getItem("token")??null
    },
    reducers:{
        login(state,action){            
            state.token=action.payload;
            localStorage.setItem("token",action.payload);
        },
        logout(state,action){
       state.token=null;
       localStorage.setItem("token",null);
        }
    }
})

export const authAction=authSlice.actions;
export default authSlice.reducer;