/* eslint-disable no-unused-vars */
import { getMonthAndYear } from '@/helpers';
import { apiSlice } from '@/redux/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { getMonth, getYear } from 'date-fns';

const vencimientosAdapter = createEntityAdapter();

const initialState = vencimientosAdapter.getInitialState();

export const vencimientosApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getVencimientos: builder.query({
      query: ({ userId, month, year }) => {
        if (month && year) {
          return `/vencimiento/${userId}/${month}/${year}/`;
        } else {
          const { month, year } = getMonthAndYear(new Date());
          return `/vencimiento/${userId}/${month}/${year}/`;
        }
      },
      transformResponse: responseData => {
        return vencimientosAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!error) {
          return [
            { type: 'Vencimiento', id: 'LIST' },
            ...(result && result.ids
              ? result.ids.map(id => ({ type: 'Vencimiento', id }))
              : [])
          ];
        }
        return [];
      }
    }),
    getVencimientoById: builder.query({
      query: vencimientoId => `/vencimientos/${vencimientoId}/`,
      transformResponse: responseData => {
        return vencimientosAdapter.setOne(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'Vencimiento', id: arg.id }];
        }
        return [];
      }
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
      invalidatesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'Vencimiento', id: arg.id }];
        }
        return [];
      }
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
      invalidatesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'Vencimiento', id: arg.id }];
        }
        return [];
      }
    }),
    deleteVencimiento: builder.mutation({
      query: vencId => {
        return {
          url: `/vencimientos/${vencId}/`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'Vencimiento', id: arg.id }];
        }
        return [];
      }
    }),
    getVencimientosRecientes: builder.query({
      query: () => '/dashboard/vencimientos_recientes',
      transformResponse: responseData => {
        return vencimientosAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!error) {
          return [
            { type: 'Vencimiento', id: 'LIST' },
            ...(result && result.ids
              ? result.ids.map(id => ({ type: 'Vencimiento', id }))
              : [])
          ];
        }
        return [];
      }
    })
  })
});

export const {
  useGetVencimientosQuery,
  useGetVencimientoByIdQuery,
  useAddNewVencimientoMutation,
  useUpdateVencimientoMutation,
  useDeleteVencimientoMutation,
  useGetVencimientosRecientesQuery
} = vencimientosApiSlice;
