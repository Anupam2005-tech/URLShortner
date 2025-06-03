import {createSlice}from '@reduxjs/toolkit'

interface authState{
    isloggedIn:boolean
}
const initialState:authState={
    isloggedIn:false
}

export const authSlice=createSlice({
    initialState,
    name:'loggedIn',
    reducers:{
        checkUserloggedIn:(state)=>{
            state.isloggedIn=true
        },
        checkUserloggedOut:(state)=>{
            state.isloggedIn=false
        }
    }
})

export const {checkUserloggedIn,checkUserloggedOut}= authSlice.actions
export default authSlice.reducer