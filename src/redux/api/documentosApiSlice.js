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
      providesTags: (result, error, arg) => [
        { type: 'Documento', id: 'LIST' },
        ...result.ids.map(id => ({ type: 'Documento', id }))
      ]
    }),
    addNewDocumento: builder.mutation({
      query: initialDocumento => {
        const formData = new FormData();
        formData.append('nombre', initialDocumento.archivo[0].name);
        formData.append('archivo', initialDocumento.archivo[0]);
        formData.append('propietario', initialDocumento.propietario);
        formData.append('categoria', initialDocumento.categoria);
        return {
          url: '/documentos/',
          method: 'POST',
          body: formData
          // headers: {
          //   'Content-Type': 'multipart/form-data'
          // },
          // formData: true
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Documento', id: arg.id }
      ]
    }),
    openDocumento: builder.mutation({
      queryFn: async (setupId, api, extraOptions, baseQuery) => {
        console.log(setupId);
        const result = await baseQuery({
          url: `/media/${setupId}/`,
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
    //   invalidatesTags: (result, error, arg) => [
    //     { type: 'Documento', id: arg.id }
    //   ]
    // }),
    deleteDocumento: builder.mutation({
      query: docId => {
        return {
          url: `/documentos/${docId}/`,
          method: 'DELETE'
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Documento', id: arg.id }
      ]
    })
  })
});

export const {
  useGetDocumentosQuery,
  useAddNewDocumentoMutation,
  useDeleteDocumentoMutation,
  useOpenDocumentoMutation
} = documentosApiSlice;