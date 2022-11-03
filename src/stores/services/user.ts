import { GetUserRequest, UserType } from "typings/user";
import baseRtkApi from ".";

export const userApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserType, GetUserRequest>({
      query: ({ id }) => ({ url: `user/${id}` }),
      providesTags: (result) => (result ? [{ type: "user", id: result.id }, "user"] : ["user"]),
    }),
    signIn: builder.mutation<void, UserType>({
      query: (body) => ({ url: "user/signIn", method: "POST", body }),
      invalidatesTags: ["user"],
    }),
    signUp: builder.mutation<void, UserType>({
      query: (body) => ({
        url: "user/signUp",
        method: "POST",
        body,
      }),
    }),
    changePassword: builder.mutation<void, UserType>({
      query: (body) => ({
        url: "user/changePassword",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useGetUserQuery, useSignInMutation, useSignUpMutation, useChangePasswordMutation } = userApi;
