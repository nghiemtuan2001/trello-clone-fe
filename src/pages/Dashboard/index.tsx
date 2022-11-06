import { Box, Button, IconButton, Typography, ClickAwayListener, TextField } from "@mui/material";
import { AppState } from "stores";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "stores/slices/common";
import DashboardLayout from "Layouts/Dashboard";
import Board from "components/Board";
import { useState } from "react";
import { TodoType } from "typings/todo";
import { theme } from "theme";
import TodoDetail from "containers/Dashboard/TodoDetail";
import { useCreateBoardMutation, useGetBoardsQuery } from "stores/services/board";
import Plus from "components/Icons/Plus";

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

  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [creatingBoardName, setCreatingBoardName] = useState("");

  const user = useSelector((state: AppState) => state.common.user);
  const { data: boards } = useGetBoardsQuery({ userId: user?.id || "1" }, { skip: !user?.id });
  const [createBoard] = useCreateBoardMutation();

  const handleCreateBoard = async () => {
    if (!creatingBoardName.length || !user) {
      setIsCreatingBoard(false);
      return;
    }

    try {
      await createBoard({
        userId: String(user.id),
        name: creatingBoardName,
      }).unwrap();

      dispatch(commonActions.showAlertMessage({ type: "success", message: "Successfully created board!" }));
    } catch (e: any) {
      dispatch(commonActions.showAlertMessage({ type: "error", message: e.data.message }));
    } finally {
      setCreatingBoardName("");
      setIsCreatingBoard(false);
    }
  };

  return (
    <DashboardLayout>
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
        {boards?.map((board) => (
          <Board key={board.id} boardId={String(board.id)} name={board.name} setSelectedTodo={setSelectedTodo} />
        ))}
        <Box
          minWidth={theme.spacing(34)}
          height={theme.spacing(3)}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor={theme.palette.grey[350]}
          p={1}
          borderRadius={1}
          sx={{ cursor: "pointer" }}
          onClick={() => setIsCreatingBoard(true)}
        >
          {!isCreatingBoard ? (
            <>
              <Typography variant="body1" color={theme.palette.grey[600]}>
                Create a board
              </Typography>
              <IconButton size="small">
                <Plus width={16} height={16} color={theme.palette.common.black} />
              </IconButton>
            </>
          ) : (
            <ClickAwayListener onClickAway={handleCreateBoard}>
              <TextField
                value={creatingBoardName}
                onChange={(e) => setCreatingBoardName(e.target.value)}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.keyCode !== 13) {
                    return;
                  }
                  handleCreateBoard();
                }}
                InputProps={{ style: { fontSize: 14, color: theme.palette.secondary.dark } }}
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  "&": {
                    ".MuiOutlinedInput-input": {
                      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
                    },
                    backgroundColor: theme.palette.grey[350],
                  },
                }}
              />
            </ClickAwayListener>
          )}
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
