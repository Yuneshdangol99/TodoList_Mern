import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: 'users/login',
        method: 'POST',
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: 'users/register',
        method: 'POST',
        body: data,
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = authApi;
