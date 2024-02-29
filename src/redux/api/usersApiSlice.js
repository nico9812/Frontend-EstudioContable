import { apiSlice } from '@/redux/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users/',
      transformResponse: responseData => {
        return usersAdapter.setAll(initialState, responseData);
      },
      // eslint-disable-next-line no-unused-vars
      providesTags: (result, error, arg) => {
        return [
          { type: 'User', id: 'LIST' },
          ...result.ids.map(id => ({ type: 'User', id }))
        ];
      }
    }),
    addNewUser: builder.mutation({
      query: initialUser => ({
        url: '/userRegister/',
        method: 'POST',
        body: {
          ...initialUser
        }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    }),
    updateUser: builder.mutation({
      query: dataReceived => {
        return {
          url: `/users/${dataReceived.userId}/`,
          method: 'PATCH',
          body: {
            ...dataReceived.data
          }
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    })
  })
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation
} = usersApiSlice;
