/* eslint-disable no-unused-vars */
import { apiSlice } from '@/redux/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

const programasAdapter = createEntityAdapter();

const initialState = programasAdapter.getInitialState();

export const programasApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProgramas: builder.query({
      query: idUser => `/programa/${idUser}/`,
      transformResponse: responseData => {
        return programasAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: 'Programa', id: 'LIST' },
        ...result.ids.map(id => ({ type: 'Programa', id }))
      ]
    }),
    addNewPrograma: builder.mutation({
      query: initialPrograma => {
        console.log(initialPrograma);
        initialPrograma = {
          ...initialPrograma,
          fecha_inicio: initialPrograma.fecha_inicio
            .toISOString()
            .split('T')[0],
          fecha_final: initialPrograma.fecha_final.toISOString().split('T')[0]
        };
        return {
          url: '/programas/',
          method: 'POST',
          body: {
            ...initialPrograma
          }
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Programa', id: arg.id }
      ]
    }),
    updatePrograma: builder.mutation({
      query: dataReceived => {
        return {
          url: `/programas/${dataReceived.programaId}/`,
          method: 'PATCH',
          body: {
            ...dataReceived.data
          }
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Programa', id: arg.id }
      ]
    }),
    deletePrograma: builder.mutation({
      query: programaId => {
        return {
          url: `/programas/${programaId}/`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Programa', id: arg.id }
      ]
    })
  })
});

export const {
  useGetProgramasQuery,
  useAddNewProgramaMutation,
  useUpdateProgramaMutation,
  useDeleteProgramaMutation
} = programasApiSlice;
