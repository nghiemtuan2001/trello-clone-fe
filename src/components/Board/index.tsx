import { Box, Typography, IconButton, Button, TextField, ClickAwayListener } from "@mui/material";
import PlusIcon from "components/Icons/Plus";
import CloseIcon from "components/Icons/CloseIcon";
import Todo from "components/Todo";
import { useCreateTodoMutation, useGetTodosQuery } from "stores/services/todo";
import { theme } from "theme";
import { TodoType } from "typings/todo";
import { useEffect, useState } from "react";
import { getRandomColorHex } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "stores/slices/common";
import { useDeleteBoardMutation, useUpdateBoardMutation } from "stores/services/board";
import { AppState } from "stores";
import { textFieldSx } from "containers/Dashboard/TodoDetail";

interface BoardProps {
  name: string;
  boardId: string | number;
  setSelectedTodo: (todo: TodoType | null) => void;
}

const Board = ({ name, boardId, setSelectedTodo }: BoardProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.common.user);

  const { data: todos } = useGetTodosQuery({ boardId });
  const [createTodo] = useCreateTodoMutation();
  const [isCreatingTodo, setIsCreatingTodo] = useState(false);
  const [creatingTodoName, setCreatingTodoName] = useState("");
  const [deleteBoard] = useDeleteBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();

  const [boardName, setBoardName] = useState(name);

  const handleCreateTodo = async () => {
    if (!creatingTodoName.length) {
      setIsCreatingTodo(false);
      return;
    }

    try {
      await createTodo({
        boardId,
        name: creatingTodoName,
        color: getRandomColorHex(),
      }).unwrap();

      dispatch(commonActions.showAlertMessage({ type: "success", message: "Successfully created task!" }));
    } catch (e: any) {
      dispatch(commonActions.showAlertMessage({ type: "error", message: e.data.message }));
    } finally {
      setCreatingTodoName("");
      setIsCreatingTodo(false);
    }
  };

  const handleDeleteBoard = async () => {
    if (user) {
      try {
        await deleteBoard({ userId: String(user.id), id: boardId }).unwrap();
        dispatch(commonActions.showAlertMessage({ type: "success", message: "Successfully deleted board!" }));
      } catch (error: any) {
        dispatch(commonActions.showAlertMessage({ type: "error", message: error.data.message }));
      }
    }
  };

  const handleUpdateBoardName = async () => {
    if (!user || boardName === name || !boardName.length) {
      return;
    }
    try {
      await updateBoard({ userId: String(user.id), id: boardId, name: boardName }).unwrap();
      dispatch(commonActions.showAlertMessage({ type: "success", message: "Successfully updated board!" }));
    } catch (error: any) {
      dispatch(commonActions.showAlertMessage({ type: "error", message: error.data.message }));
    }
  };

  return (
    <Box
      maxHeight={`calc(100vh - ${theme.spacing(19)})`}
      minWidth={theme.spacing(34)}
      display="flex"
      flexDirection="column"
      alignSelf="start"
      bgcolor={theme.palette.grey[350]}
      p={1}
      borderRadius={1}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <TextField
          InputProps={{ style: { fontSize: 16, fontWeight: 600, color: theme.palette.secondary.dark } }}
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          variant="outlined"
          size="small"
          sx={textFieldSx}
          onBlur={() => {
            if (!boardName.length) {
              setBoardName(name);
              return;
            }
            handleUpdateBoardName();
          }}
        />
        <IconButton size="small" onClick={handleDeleteBoard}>
          <CloseIcon width={16} height={16} />
        </IconButton>
      </Box>
      <Box display="grid" gap={1} height="100%" overflow="auto">
        {todos?.map((todo, index) => (
          <Todo key={index} todo={todo} setSelectedTodo={setSelectedTodo} />
        ))}
      </Box>
      {!isCreatingTodo ? (
        <Button size="small" fullWidth sx={{ pb: 0.25 }} onClick={() => setIsCreatingTodo(true)}>
          <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color={theme.palette.grey[600]}>
              Add a todo
            </Typography>
            <PlusIcon color={theme.palette.grey[600]} />
          </Box>
        </Button>
      ) : (
        <Box pt={1}>
          <ClickAwayListener onClickAway={handleCreateTodo}>
            <TextField
              value={creatingTodoName}
              onChange={(e) => setCreatingTodoName(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.keyCode !== 13) {
                  return;
                }
                handleCreateTodo();
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
                },
              }}
            />
          </ClickAwayListener>
        </Box>
      )}
    </Box>
  );
};

export default Board;
