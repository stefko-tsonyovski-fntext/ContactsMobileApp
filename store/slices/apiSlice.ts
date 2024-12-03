// Need to use the React-specific entry point to import createApi
import { BACKEND_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: ({ token }) => ({
        url: "contact",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Contact"],
    }),
    getContactById: builder.query({
      query: ({ token, contactId }) => ({
        url: `contact/${contactId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Contact"],
    }),
    createContact: builder.mutation({
      query: ({ token, formData }) => ({
        url: "contact",
        method: "POST",
        body: formData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Contact"],
    }),
    editContact: builder.mutation({
      query: ({ token, formData, contactId }) => ({
        url: `contact/${contactId}`,
        method: "PUT",
        body: formData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation({
      query: ({ token, contactId }) => ({
        url: `contact/${contactId}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Contact"],
    }),
    getUserById: builder.query({
      query: ({ token, userId }) => ({
        url: `user/${userId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ body }) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: ({ body }) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
  tagTypes: ["Contact"],
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllContactsQuery,
  useGetContactByIdQuery,
  useCreateContactMutation,
  useEditContactMutation,
  useDeleteContactMutation,
  useGetUserByIdQuery,
  useLoginMutation,
  useRegisterMutation,
} = apiSlice;
