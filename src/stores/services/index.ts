import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseRtkApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_URL}/v1` }),
  refetchOnReconnect: true,
  keepUnusedDataFor: 30,
  tagTypes: ["todo", "board", "user"],
  endpoints: () => ({}),
});

export default baseRtkApi;
