import { AlertColor } from "@mui/material";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "typings/user";

export interface MessageState {
  open: boolean;
  message: string;
  type?: AlertColor;
}
interface CommonState {
  message: MessageState;
  user?: Omit<UserType, "password">;
}

const initialState: CommonState = {
  message: {
    open: false,
    message: "",
  },
};

const showAlertMessage: CaseReducer<CommonState, PayloadAction<Omit<MessageState, "open">>> = (state, { payload }) => {
  state.message = { ...payload, open: true };
};

const hideAlertMessage: CaseReducer<CommonState> = (state) => {
  state.message.open = false;
};

const setUser: CaseReducer<CommonState, PayloadAction<Omit<UserType, "password"> | undefined>> = (
  state,
  { payload }
) => {
  state.user = payload;
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    showAlertMessage,
    hideAlertMessage,
    setUser,
  },
});

export const commonReducer = commonSlice.reducer;

export const commonActions = commonSlice.actions;

export const caseReducers = commonSlice.caseReducers;
