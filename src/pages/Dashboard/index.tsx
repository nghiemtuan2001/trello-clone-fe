import { Box, Button, Typography } from "@mui/material";
import { AppState } from "stores";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "stores/slices/common";
import DashboardLayout from "Layouts/Dashboard";
import Board from "components/Board";
import { useState } from "react";
import { TodoType } from "typings/todo";
import { theme } from "theme";
import TodoDetail from "containers/Dashboard/TodoDetail";
import { useCreateTodoMutation } from "stores/services/todo";

const MOCK_BOARDS = [
  {
    id: 1,
    name: "Board 1",
  },
  {
    id: 2,
    name: "Board 2",
  },
  {
    id: 3,
    name: "Board 3",
  },
  {
    id: 1,
    name: "Board 1",
  },
  {
    id: 2,
    name: "Board 2",
  },
  {
    id: 3,
    name: "Board 3",
  },
  {
    id: 1,
    name: "Board 1",
  },
  {
    id: 2,
    name: "Board 2",
  },
  {
    id: 3,
    name: "Board 3",
  },
  {
    id: 1,
    name: "Board 1",
  },
  {
    id: 2,
    name: "Board 2",
  },
  {
    id: 3,
    name: "Board 3",
  },
];

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [createTodo] = useCreateTodoMutation();

  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

  const message = useSelector((state: AppState) => state.common.message);

  const handleChangeMessage = () => {
    dispatch(commonActions.setMessage("new message!"));
    createTodo({
      name: "todoTT",
      boardId: "1587660565541556224",
      priority: "LOW",
      startTime: new Date().toISOString(),
      expireTime: new Date().toISOString(),
      description: "Desc",
      color: "#000000",
      completed: false,
    })
      .unwrap()
      .then((res) => console.log(res));
  };

  // console.log(todosData);

  return (
    <DashboardLayout>
      <Button onClick={handleChangeMessage}>Click to set message</Button>
      <Typography>{message}</Typography>
      <TodoDetail todo={selectedTodo} setSelectedTodo={setSelectedTodo} />
      <Box
        display="flex"
        height={`calc(100vh - ${theme.spacing(17)})`}
        flexWrap="nowrap"
        overflow="auto"
        gap={1.5}
        py={1}
        px={2}
      >
        {MOCK_BOARDS.map((board, index) => (
          <Board key={index} name={board.name} setSelectedTodo={setSelectedTodo} />
        ))}
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
