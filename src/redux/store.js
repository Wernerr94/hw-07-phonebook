import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { phonebook } from './reducer';
import { contactsApi } from '../servises/contacts';

export const store = configureStore({
  reducer: {
    phonebook,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});

setupListeners(store.dispatch);
