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
      providesTags: (result, error, arg) => {
        if (!error) {
          return [
            { type: 'Programa', id: 'LIST' },
            ...(result && result.ids
              ? result.ids.map(id => ({ type: 'Programa', id }))
              : [])
          ];
        }
        return [];
      }
    }),
    addNewPrograma: builder.mutation({
      query: initialPrograma => {
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
      invalidatesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'Programa', id: arg.id }];
        }
        return [];
      }
    }),
    updatePrograma: builder.mutation({
      query: dataReceived => {
        const { data, programaId } = dataReceived;
        return {
          url: `/programas/${programaId}/`,
          method: 'PATCH',
          body: {
            ...data,
            fecha_inicio: data.fecha_inicio.toISOString().split('T')[0],
            fecha_final: data.fecha_final.toISOString().split('T')[0]
          }
        };
      },
      invalidatesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'Programa', id: arg.id }];
        }
        return [];
      }
    }),
    deletePrograma: builder.mutation({
      query: programaId => {
        return {
          url: `/programas/${programaId}/`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'Programa', id: arg.id }];
        }
        return [];
      }
    })
  })
});

export const {
  useGetProgramasQuery,
  useAddNewProgramaMutation,
  useUpdateProgramaMutation,
  useDeleteProgramaMutation
} = programasApiSlice;
