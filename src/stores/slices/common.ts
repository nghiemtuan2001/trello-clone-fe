import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  message: string;
}

const initialState: CommonState = {
  message: "init",
};

const setMessage: CaseReducer<CommonState, PayloadAction<string>> = (state, { payload }) => {
  state.message = payload;
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setMessage,
  },
});

export const commonReducer = commonSlice.reducer;

export const commonActions = commonSlice.actions;

export const caseReducers = commonSlice.caseReducers;
