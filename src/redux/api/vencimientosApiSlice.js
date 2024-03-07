/* eslint-disable no-unused-vars */
import { apiSlice } from '@/redux/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

const vencimientosAdapter = createEntityAdapter();

const initialState = vencimientosAdapter.getInitialState();

export const vencimientosApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getVencimientos: builder.query({
      query: userId => `/vencimiento/${userId}/`,
      transformResponse: responseData => {
        return vencimientosAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: 'Vencimiento', id: 'LIST' },
        ...result.ids.map(id => ({ type: 'Vencimiento', id }))
      ]
    }),
    addNewVencimiento: builder.mutation({
      query: initialVencimiento => {
        initialVencimiento = {
          ...initialVencimiento,
          fecha: initialVencimiento.fecha.toISOString().split('T')[0]
        };
        return {
          url: '/vencimientos/',
          method: 'POST',
          body: {
            ...initialVencimiento
          }
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Vencimiento', id: arg.id }
      ]
    }),
    updateVencimiento: builder.mutation({
      query: dataReceived => {
        dataReceived = {
          ...dataReceived,
          data: {
            ...dataReceived.data,
            fecha: new Date(dataReceived.data.fecha).toISOString().split('T')[0]
          }
        };
        return {
          url: `/vencimientos/${dataReceived.vencimientoId}/`,
          method: 'PATCH',
          body: {
            ...dataReceived.data
          }
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Vencimiento', id: arg.id }
      ]
    }),
    deleteVencimiento: builder.mutation({
      query: vencId => {
        return {
          url: `/vencimientos/${vencId}/`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Vencimiento', id: arg.id }
      ]
    })
  })
});

export const {
  useGetVencimientosQuery,
  useAddNewVencimientoMutation,
  useUpdateVencimientoMutation,
  useDeleteVencimientoMutation
} = vencimientosApiSlice;
