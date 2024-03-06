import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from 'redux-persist';

import storageSession from 'redux-persist/lib/storage/session';

import { apiSlice } from '@/redux/apiSlice';
import authReducerSlice from '@/redux/reducer/authReducerSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducerSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]
      }
    }).concat(apiSlice.middleware),
  devTools: true
});

const persistor = persistStore(store);

export { store, persistor };
