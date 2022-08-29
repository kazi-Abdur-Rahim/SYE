import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'registration',
    initialState: {
        isLoading: true,
        userInfo:null,
        error: null,
        success: false
    },
    reducers:{
        login: (state,action)=>{
            state.isLoading = false
            state.userInfo = action.payload
            state.error = null
            state.success = true
        }
    }
})

export const {login} = userSlice.actions

export default userSlice.reducer