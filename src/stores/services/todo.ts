import { GetTodosRequest, GetTodosResponse, TodoType, GetTodoRequest, DeleteTodoRequest } from "typings/todo";
import baseRtkApi from ".";

export const todoApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<TodoType[], GetTodosRequest>({
      query: ({ boardId }) => ({ url: `/${boardId}/todos` }),
      transformResponse: (res: GetTodosResponse) => res.todos,
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: "todo" as const, id })), "todo"] : ["todo"],
    }),
    getTodo: builder.query<TodoType, GetTodoRequest>({
      query: ({ boardId, id }) => ({ url: `/${boardId}/todos/${id}` }),
    }),
    createTodo: builder.mutation<TodoType, TodoType>({
      query: ({ boardId, ...body }) => ({
        url: `/${boardId}/todo`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["todo"],
    }),
    deleteTodo: builder.mutation<void, DeleteTodoRequest>({
      query: ({ boardId, id }) => ({
        url: `/${boardId}/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
    updateTodo: builder.mutation<void, TodoType>({
      query: ({ boardId, ...body }) => ({
        url: `/${boardId}/todo/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "todo", id }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
