/* eslint-disable no-unused-vars */
import { apiSlice } from '@/redux/apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';

const documentosAdapter = createEntityAdapter();

const initialState = documentosAdapter.getInitialState();

export const documentosApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDocumentos: builder.query({
      query: userId => `/documentoscli/${userId}/`,
      transformResponse: responseData => {
        return documentosAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!error) {
          return [
            { type: 'Documento', id: 'LIST' },
            ...(result && result.ids
              ? result.ids.map(id => ({ type: 'Documento', id }))
              : [])
          ];
        }
        return [];
      }
    }),
    getDocumentosFiltrados: builder.query({
      query: ({ strCat, userId }) => {
        if (strCat === '0') {
          strCat === 'todas';
        }
        return `/documentosFiltrar/${strCat}/${userId}/`;
      },
      transformResponse: responseData => {
        return documentosAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!error) {
          return [
            { type: 'Documento', id: 'LIST' },
            ...(result && result.ids
              ? result.ids.map(id => ({ type: 'Documento', id }))
              : [])
          ];
        }
        return [];
      }
    }),
    addNewDocumento: builder.mutation({
      query: initialDocumento => {
        const formData = new FormData();
        formData.append('nombre', initialDocumento.archivo.name);
        formData.append('archivo', initialDocumento.archivo);
        formData.append('propietario', initialDocumento.propietario);
        formData.append('categoria', initialDocumento.categoria);
        return {
          url: '/documentos/',
          method: 'POST',
          body: formData
        };
      },
      invalidatesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'Documento', id: arg.id }];
        }
        return [];
      }
    }),
    openDocumento: builder.mutation({
      queryFn: async (documentoID, api, extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: `/media/${documentoID}/`,
          responseHandler: response => response.blob()
        });
        var hiddenElement = document.createElement('a');
        var url = window.URL || window.webkitURL;
        var blobPDF = url.createObjectURL(result.data);
        hiddenElement.href = blobPDF;
        hiddenElement.target = '_blank';
        hiddenElement.click();
        return { data: null };
      }
    }),
    // updateDocumento: builder.mutation({
    //   query: dataReceived => {
    //     return {
    //       url: `/documentos/${dataReceived.documentoId}/`,
    //       method: 'PATCH',
    //       body: {
    //         ...dataReceived.data
    //       }
    //     };
    //   },
    //   invalidatesTags: (result, error, arg) => {
    //     if (!error) {
    //       return [{ type: 'Documento', id: arg.id }];
    //     }
    //     return [];
    //   }
    // }),
    deleteDocumento: builder.mutation({
      query: docId => {
        return {
          url: `/documentos/${docId}/`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, arg) => {
        if (!error) {
          return [{ type: 'Documento', id: arg.id }];
        }
        return [];
      }
    }),
    getDocumentosRecientes: builder.query({
      query: () => `/dashboard/documentos_recientes`,
      transformResponse: responseData => {
        return documentosAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!error) {
          return [
            { type: 'Documento', id: 'LIST' },
            ...(result && result.ids
              ? result.ids.map(id => ({ type: 'Documento', id }))
              : [])
          ];
        }
        return [];
      }
    })
  })
});

export const {
  useGetDocumentosQuery,
  useGetDocumentosFiltradosQuery,
  useAddNewDocumentoMutation,
  useDeleteDocumentoMutation,
  useOpenDocumentoMutation,
  useGetDocumentosRecientesQuery
} = documentosApiSlice;
