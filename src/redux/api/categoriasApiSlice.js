/* eslint-disable no-unused-vars */
import { apiSlice } from '@/redux/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

const categoriasAdapter = createEntityAdapter();

const initialState = categoriasAdapter.getInitialState();

export const categoriasApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategorias: builder.query({
      query: () => `/categorias/`,
      transformResponse: responseData => {
        return categoriasAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: 'Categoria', id: 'LIST' },
        ...result.ids.map(id => ({ type: 'Categoria', id }))
      ]
    }),
    addNewCategoria: builder.mutation({
      query: initialCategoria => ({
        url: '/categorias/',
        method: 'POST',
        body: {
          ...initialCategoria
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Categoria', id: arg.id }
      ]
    }),
    updateCategoria: builder.mutation({
      query: dataReceived => {
        return {
          url: `/categorias/${dataReceived.categoriaId}/`,
          method: 'PATCH',
          body: {
            ...dataReceived.data
          }
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Categoria', id: arg.id }
      ]
    }),
    deleteCategoria: builder.mutation({
      query: catId => {
        return {
          url: `/categorias/${catId}/`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Categoria', id: arg.id }
      ]
    })
  })
});

export const {
  useGetCategoriasQuery,
  useAddNewCategoriaMutation,
  useUpdateCategoriaMutation,
  useDeleteCategoriaMutation
} = categoriasApiSlice;
