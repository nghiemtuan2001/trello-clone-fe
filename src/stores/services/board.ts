import { BoardType, DeleteBoardRequest, GetBoardsRequest, GetBoardsResponse } from "typings/board";
import baseRtkApi from ".";

export const boardApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<BoardType[], GetBoardsRequest>({
      query: ({ userId }) => ({ url: `/${userId}/boards` }),
      transformResponse: (res: GetBoardsResponse) => res.boards,
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: "board" as const, id })), "board"] : ["board"],
    }),
    createBoard: builder.mutation<BoardType, BoardType>({
      query: ({ userId, ...body }) => ({
        url: `/${userId}/board`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["board"],
    }),
    deleteBoard: builder.mutation<void, DeleteBoardRequest>({
      query: ({ userId, id }) => ({
        url: `/${userId}/boards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["board"],
    }),
    updateBoard: builder.mutation<void, BoardType>({
      query: ({ userId, id, ...board }) => ({
        url: `/${userId}/board/${id}`,
        method: "PATCH",
        body: { board },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "board", id }],
    }),
  }),
});

export const { useCreateBoardMutation, useDeleteBoardMutation, useGetBoardsQuery, useUpdateBoardMutation } = boardApi;
