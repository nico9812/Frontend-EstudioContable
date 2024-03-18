import { apiSlice } from '@/redux/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/userLogin/',
        method: 'POST',
        body: { ...credentials }
      }),
      invalidatesTags: ['User', 'Categoria', 'Documento', 'Programa']
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout/',
        method: 'GET'
      })
    }),
    validateToken: builder.mutation({
      query: () => ({
        url: '/validate_token/',
        method: 'GET'
      })
    })
  })
});

export const { useLoginMutation, useLogoutMutation, useValidateTokenMutation } =
  authApiSlice;
