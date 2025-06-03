import { createSlice } from "@reduxjs/toolkit";

interface loadingStateProps{
    isLoadingIn:boolean
}
const initialState:loadingStateProps={
    isLoadingIn:false
}
export const userLoadingSlice=createSlice({
    initialState,
    name:"loading",
    reducers:{
        checkLoadingIn:(state)=>{
            state.isLoadingIn=true
        },
        checkLoadingOut:(state)=>{
            state.isLoadingIn=false
        }
    }

})

export const {checkLoadingIn,checkLoadingOut}=userLoadingSlice.actions
export default userLoadingSlice.reducer