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
        editUser:builder.mutation({
            query:(id)=>({
              url:`${ADMIN_URL}/edit`,
              method:'GET',
              params:{id:id}
            })
        }),
        updateUserAdmin:builder.mutation({
            query:(data)=>({
              url:`${ADMIN_URL}/edit`,
              method:'PUT',
              body:data,
            })
        }),
        deleteUser:builder.mutation({
            query:(id)=>({
              url:`${ADMIN_URL}/users`,
              method:'DELETE',
              params:{id:id}
            })
        }),
        createUser:builder.mutation({
            query:(data)=>({
              url:`${ADMIN_URL}/users`,
              method:'POST',
              body:data
            })
        }),
    }),
});

export const {useAdminLoginMutation,useGetUserMutation,useEditUserMutation,useUpdateUserAdminMutation,useDeleteUserMutation,useCreateUserMutation} = adminApiSlice