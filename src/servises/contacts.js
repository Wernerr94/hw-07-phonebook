import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://63173294cb0d40bc414ebed8.mockapi.io',
  }),
  tagTypes: ['Contact'],
  endpoints: builder => ({
    getAllContacts: builder.query({
      query: () => `/contacts/?orderBy=id&order=desc`,
      providesTags: ['Contact'],
    }),
    addContact: builder.mutation({
      query(body) {
        return {
          url: `/contacts/`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Contact'],
    }),

    removeContact: builder.mutation({
      query(id) {
        return {
          url: `/contacts/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useAddContactMutation,
  useRemoveContactMutation,
} = contactsApi;
