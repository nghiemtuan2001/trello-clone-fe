import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  userName: string;
  email: string;
}

interface CommonState {
  message: string;
  user?: User;
}

const initialState: CommonState = {
  message: "init",
};

const setMessage: CaseReducer<CommonState, PayloadAction<string>> = (state, { payload }) => {
  state.message = payload;
};

const setUser: CaseReducer<CommonState, PayloadAction<User | undefined>> = (state, { payload }) => {
  state.user = payload;
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setMessage,
    setUser,
  },
});

export const commonReducer = commonSlice.reducer;

export const commonActions = commonSlice.actions;

export const caseReducers = commonSlice.caseReducers;
