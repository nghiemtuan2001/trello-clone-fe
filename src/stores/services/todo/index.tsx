import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  id: string | number;
  boardId: string | number;
  priority: number;
  name: string;
  expireTime: Date;
}

export const baseRtkApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8090/v1" }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => ({ url: "/todo", method: "GET" }),
    }),
  }),
  refetchOnReconnect: true,
});

export default baseRtkApi;

export const { useGetTodosQuery } = baseRtkApi;
