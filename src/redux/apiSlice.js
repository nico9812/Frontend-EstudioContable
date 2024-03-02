import { VITE_APP_API_URL } from '@/constants';
import { logOut } from '@/redux/reducer/authReducerSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { REHYDRATE } from 'redux-persist';

function isHydrateAction(action) {
  return action.type === REHYDRATE;
}

export const baseQuery = fetchBaseQuery({
  baseUrl: VITE_APP_API_URL,
  credentials: 'same-origin',
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
    api.dispatch(apiSlice.util.resetApiState());
    toast.error(`Tu sesión ha expirado.`);
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Categoria', 'Documento', 'Vencimiento'],
  // eslint-disable-next-line no-unused-vars
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      if (action.key === 'key used with redux-persist') {
        return action.payload;
      }
      return action.payload[apiSlice.reducerPath];
    }
  },
  // eslint-disable-next-line no-unused-vars
  endpoints: builder => ({})
});
