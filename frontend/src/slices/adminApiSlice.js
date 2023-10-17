import { apiSlice } from "./apiSlice";
const ADMIN_URL = 'api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        adminLogin:builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/login`,
                method:'POST',
                body:data,
            })
        }),
        getUser:builder.mutation({
            query:()=>({
                url:`${ADMIN_URL}/users`,
                method:'GET',
            })
        }),
    }),
});

export const {useAdminLoginMutation,useGetUserMutation} = adminApiSlice