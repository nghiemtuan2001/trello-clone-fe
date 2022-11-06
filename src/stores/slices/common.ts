import { AlertColor } from "@mui/material";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "typings/user";

export interface MessageState {
  open: boolean;
  message: string;
  type?: AlertColor;
}

export enum TodoFilterCompleted {
  UNCOMPLETED,
  COMPLETED,
}

export interface TodoFilterType {
  filterName?: string;
  filterPriority?: "LOW" | "MEDIUM" | "HIGH" | "NONE";
  filterCompleted?: TodoFilterCompleted | "NONE";
}

interface CommonState {
  message: MessageState;
  user?: Omit<UserType, "password">;
  todoFilter: TodoFilterType;
}

const initialState: CommonState = {
  message: {
    open: false,
    message: "",
  },
  todoFilter: {
    filterName: "",
    filterPriority: "NONE",
    filterCompleted: "NONE",
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

const setTodoFilter: CaseReducer<CommonState, PayloadAction<TodoFilterType>> = (state, { payload }) => {
  state.todoFilter = { ...state.todoFilter, ...payload };
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    showAlertMessage,
    hideAlertMessage,
    setUser,
    setTodoFilter,
  },
});

export const commonReducer = commonSlice.reducer;

export const commonActions = commonSlice.actions;

export const caseReducers = commonSlice.caseReducers;
