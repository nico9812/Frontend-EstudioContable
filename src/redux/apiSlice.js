import { VITE_APP_API_URL } from '@/constants';
import { logOut } from '@/redux/reducer/authReducerSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';

export const baseQuery = fetchBaseQuery({
  baseUrl: VITE_APP_API_URL,
  credentials: 'same-origin',
  tagTypes: ['User', 'Categoria', 'Documento', 'Vencimiento'],
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token !== undefined || token !== '') {
      headers.set('authorization', `Token ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403 || result?.error?.status === 401) {
    api.dispatch(logOut());
    
    toast.error(`Tu sesión ha expirado.`);
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  // eslint-disable-next-line no-unused-vars
  endpoints: builder => ({})
});
