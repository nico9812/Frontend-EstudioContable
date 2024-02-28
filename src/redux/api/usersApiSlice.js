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
        return [
          { type: 'User', id: 'LIST' },
          ...result.ids.map(id => ({ type: 'User', id }))
        ];
      }
    })
  })
});

export const { useGetUsersQuery } = usersApiSlice;
