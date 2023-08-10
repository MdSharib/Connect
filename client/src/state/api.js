import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  // hitting api in backend
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }), //http://localhost:1337
  reducerPath: "main",
  tagTypes: [],
  endpoints: (build) => ({
    
    postLogin: build.mutation({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    postSignUp: build.mutation({
      query: (payload) => ({
        url: "auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  usePostAiTextMutation,
  usePostAiCodeMutation,
  usePostAiAssistMutation,
  usePostLoginMutation,
  usePostSignUpMutation,
} = api;


