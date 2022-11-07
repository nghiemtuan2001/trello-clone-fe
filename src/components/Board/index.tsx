import { Box, Typography, IconButton, Button, TextField, ClickAwayListener } from "@mui/material";
import PlusIcon from "components/Icons/Plus";
import CloseIcon from "components/Icons/CloseIcon";
import Todo from "components/Todo";
import { useCreateTodoMutation, useLazyGetTodosQuery, useUpdateTodoMutation } from "stores/services/todo";
import { theme } from "theme";
import { TodoType } from "typings/todo";
import { useEffect, useState } from "react";
import { getRandomColorHex } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "stores/slices/common";
import { useDeleteBoardMutation, useUpdateBoardMutation } from "stores/services/board";
import { AppState } from "stores";
import { textFieldSx } from "containers/Dashboard/TodoDetail";
import { addDays } from "date-fns";
import produce from "immer";
import { BoardType } from "typings/board";
import { SortableContext, useSortable, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TodoByBoard } from "pages/Dashboard";
import { useDndMonitor } from "@dnd-kit/core";

interface BoardProps {
  name: string;
  boardId: string | number;
  setSelectedTodo: (todo: TodoType | null) => void;
  setBoards: React.Dispatch<React.SetStateAction<BoardType[]>>;
  setTodos: React.Dispatch<React.SetStateAction<TodoByBoard[]>>;
  todos: TodoType[];
  handleSyncTodoAfterCreating: (boardId: string | number, todo: TodoType) => void;
}

const Board = ({
  name,
  boardId,
  setSelectedTodo,
  setBoards,
  setTodos,
  todos,
  handleSyncTodoAfterCreating,
}: BoardProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.common.user);
  const todoFilter = useSelector((state: AppState) => state.common.todoFilter);

  const [getTodos, { data: todosData }] = useLazyGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [isCreatingTodo, setIsCreatingTodo] = useState(false);
  const [creatingTodoName, setCreatingTodoName] = useState("");
  const [deleteBoard] = useDeleteBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const [boardName, setBoardName] = useState(name);

  const { setNodeRef, listeners, transform, transition, isDragging } = useSortable({
    id: boardId,
    data: { type: "column" },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  useDndMonitor({
    async onDragEnd({ active, over }) {
      if (active.id === over.id) {
        return;
      }

      const activeIndex = todos.findIndex((todos) => todos.id === active.id);
      const overIndex = todos.findIndex((todos) => todos.id === over.id);

      if (activeIndex < 0 || overIndex < 0) {
        return;
      }

      try {
        const activeTodo = todos[activeIndex];
        const overTodo = todos[overIndex];

        setTodos((prev) =>
          produce(prev, (draft) => {
            const index = prev.findIndex((todos) => todos.boardId === boardId);
            const activeTodoIndex = prev[index].todos.findIndex((todo) => todo.id === active.id);
            const overTodoIndex = prev[index].todos.findIndex((todo) => todo.id === over.id);
            if (index < 0 || activeTodoIndex < 0 || overTodoIndex < 0) {
              return;
            }

            draft[index].todos = arrayMove(draft[index].todos, activeTodoIndex, overTodoIndex);
          })
        );

        await updateTodo({
          boardId,
          id: activeTodo.id,
          order: overTodo.order,
          updateMask: "order",
        }).unwrap();
        await updateTodo({
          boardId,
          id: overTodo.id,
          order: activeTodo.order,
          updateMask: "order",
        }).unwrap();
      } catch (error: any) {
        dispatch(commonActions.showAlertMessage({ type: "error", message: error.data.message }));
      }
    },
  });

  const handleCreateTodo = async () => {
    if (!creatingTodoName.length) {
      setIsCreatingTodo(false);
      return;
    }

    try {
      const todo = await createTodo({
        boardId,
        name: creatingTodoName,
        color: getRandomColorHex(),
        startTime: new Date().toISOString(),
        expireTime: addDays(new Date(), 1).toISOString(),
      }).unwrap();

      handleSyncTodoAfterCreating(boardId, todo);
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
        setBoards((prev) => prev.filter((board) => board.id !== boardId));
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
      setBoards((prev) =>
        produce(prev, (draft) => {
          const index = draft.findIndex((board) => board.id === boardId);
          if (index >= 0) {
            draft[index].name = boardName;
          }
        })
      );
      dispatch(commonActions.showAlertMessage({ type: "success", message: "Successfully updated board!" }));
    } catch (error: any) {
      dispatch(commonActions.showAlertMessage({ type: "error", message: error.data.message }));
    }
  };

  useEffect(() => {
    getTodos({
      boardId,
      filterName: !!todoFilter.filterName ? todoFilter.filterName : undefined,
      filterPriority:
        !!todoFilter.filterPriority && todoFilter.filterPriority === "NONE" ? undefined : todoFilter.filterPriority,
      filterCompleted:
        todoFilter.filterCompleted !== undefined && todoFilter.filterCompleted === "NONE"
          ? undefined
          : Number(todoFilter.filterCompleted),
    })
      .unwrap()
      .then((data) => {
        setTodos((prev) =>
          produce(prev, (draft) => {
            const index = prev.findIndex((todos) => {
              return todos.boardId === boardId;
            });
            if (index < 0) {
              draft.push({ boardId, todos: data });

              return;
            }
            draft[index] = { boardId, todos: data };
          })
        );
      });
  }, [
    boardId,
    getTodos,
    setTodos,
    todoFilter.filterCompleted,
    todoFilter.filterName,
    todoFilter.filterPriority,
    todosData,
  ]);

  return (
    <Box
      {...listeners}
      sx={{
        ...style,
        minWidth: theme.spacing(34),
      }}
      ref={setNodeRef}
    >
      <Box
        maxHeight={`calc(100vh - ${theme.spacing(19)})`}
        minWidth={theme.spacing(34)}
        display="flex"
        flexDirection="column"
        alignSelf="start"
        bgcolor={theme.palette.grey[350]}
        p={1}
        borderRadius={1}
        sx={{
          ...(isDragging ? { transform: "rotate(-6deg)" } : {}),
          transition: "0.1s ease-in-out",
        }}
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
        <SortableContext strategy={rectSortingStrategy} items={todos.map((todo) => String(todo.id))}>
          <Box display="grid" gap={1} height="100%" sx={{ overflowY: "auto" }}>
            {todos.map((todo, index) => (
              <Todo key={index} todo={todo} setSelectedTodo={setSelectedTodo} />
            ))}
          </Box>
        </SortableContext>
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
    </Box>
  );
};

export default Board;
