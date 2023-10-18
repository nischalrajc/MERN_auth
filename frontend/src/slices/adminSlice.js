import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        admin:localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null,  
    },
    reducers:{
        adminLoginR:(state,action)=>{
            state.admin=action.payload
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        adminLogoutR:(state,action)=>{
            state.admin = null;
            localStorage.removeItem('adminInfo');
        }
    }
})

export const {adminLoginR,adminLogoutR} = adminSlice.actions;

export default adminSlice.reducer;