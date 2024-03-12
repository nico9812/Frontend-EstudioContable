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
      providesTags: (result, error, arg) => {
        if (!error) {
          return [
            { type: 'Categoria', id: 'LIST' },
            ...(result && result.ids
              ? result.ids.map(id => ({ type: 'Categoria', id }))
              : [])
          ];
        }
        return [];
      }
    }),
    addNewCategoria: builder.mutation({
      query: initialCategoria => ({
        url: '/categorias/',
        method: 'POST',
        body: {
          ...initialCategoria
        }
      }),
      invalidatesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'Categoria', id: arg.id }];
        }
        return [];
      }
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
      invalidatesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'Categoria', id: arg.id }];
        }
        return [];
      }
    }),
    deleteCategoria: builder.mutation({
      query: catId => {
        return {
          url: `/categorias/${catId}/`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'Categoria', id: arg.id }];
        }
        return [];
      }
    })
  })
});

export const {
  useGetCategoriasQuery,
  useAddNewCategoriaMutation,
  useUpdateCategoriaMutation,
  useDeleteCategoriaMutation
} = categoriasApiSlice;
