import { apiSlice } from '@/redux/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/userLogin/',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout/',
        method: 'GET'
      })
    })
  })
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
