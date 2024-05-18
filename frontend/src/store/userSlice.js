import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    setUserDetails: (state, action)=>{
        state.user = action.payload             //this is receiving the details using dispatch method used in app.js, now using this "state" we will display/fetch all the things in/to the header.js
    }
    },
})


export const {setUserDetails} = userSlice.actions

export default userSlice.reducer