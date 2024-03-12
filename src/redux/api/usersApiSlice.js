/* eslint-disable no-unused-vars */
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
      providesTags: (result, error, arg) => {
        if (!error) {
          return [
            { type: 'User', id: 'LIST' },
            ...(result && result.ids
              ? result.ids.map(id => ({ type: 'User', id }))
              : [])
          ];
        }
        return [];
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
      invalidatesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'User', id: arg.id }];
        }
        return [];
      }
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
      invalidatesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'User', id: arg.id }];
        }
        return [];
      }
    }),
    deleteUser: builder.mutation({
      query: userId => {
        return {
          url: `/users/${userId}/`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'User', id: arg.id }];
        }
        return [];
      }
    })
  })
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersApiSlice;
