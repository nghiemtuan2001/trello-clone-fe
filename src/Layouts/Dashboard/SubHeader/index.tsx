import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import useCallbackDebounce from "hooks/useCallbackDebounce";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "stores";
import { commonActions, TodoFilterCompleted, TodoFilterType } from "stores/slices/common";
import { theme } from "theme";
import { Priorities } from "typings/common";

const SubHeader = () => {
  const dispatch = useDispatch();
  const todoFilter = useSelector((state: AppState) => state.common.todoFilter);

  const handleSetTodoFilter = (filter: TodoFilterType) => {
    dispatch(commonActions.setTodoFilter(filter));
  };

  const handleSetTodoFilterName = useCallbackDebounce((value: string) => {
    handleSetTodoFilter({ filterName: value });
  }, 500);

  return (
    <Box display="flex" alignItems="center" gap={1} p={1} bgcolor="rgb(210, 212, 218, 0.5)">
      <Typography>Filter:</Typography>
      <TextField
        onChange={(e) => handleSetTodoFilterName(e.target.value)}
        sx={{
          height: 40,
          "&": {
            ".MuiOutlinedInput-input": {
              padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
            },
          },
        }}
      />
      <Select
        value={todoFilter.filterPriority}
        onChange={(e) => handleSetTodoFilter({ filterPriority: e.target.value as "LOW" })}
        renderValue={(value) =>
          value === "NONE" ? (
            "None"
          ) : (
            <Box display="flex" alignItems="center">
              {Priorities[value as "LOW"]}
            </Box>
          )
        }
        sx={{
          height: 40,
        }}
      >
        <MenuItem value={"NONE"}>None</MenuItem>
        <MenuItem value={"LOW"}>{Priorities.LOW}</MenuItem>
        <MenuItem value={"MEDIUM"}>{Priorities.MEDIUM}</MenuItem>
        <MenuItem value={"HIGH"}>{Priorities.HIGH}</MenuItem>
      </Select>
      <Select
        value={todoFilter.filterCompleted}
        onChange={(e) => handleSetTodoFilter({ filterCompleted: e.target.value as 0 })}
        sx={{
          height: 40,
        }}
      >
        <MenuItem value={"NONE"}>None</MenuItem>
        <MenuItem value={TodoFilterCompleted.COMPLETED}>Completed</MenuItem>
        <MenuItem value={TodoFilterCompleted.UNCOMPLETED}>Uncompleted</MenuItem>
      </Select>
    </Box>
  );
};

export default SubHeader;
