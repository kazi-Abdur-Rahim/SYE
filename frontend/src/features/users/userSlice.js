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
        },
        logout: (state)=>{
            state.isLoading = false
            state.error = null
            state.userInfo = null
            state.success = false
        }
    }
})

export const {login} = userSlice.actions

export default userSlice.reducer