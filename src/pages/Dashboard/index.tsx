import { Box, IconButton, Typography, ClickAwayListener, TextField } from "@mui/material";
import { AppState } from "stores";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "stores/slices/common";
import DashboardLayout from "Layouts/Dashboard";
import Board from "components/Board";
import { useEffect, useState } from "react";
import { TodoType } from "typings/todo";
import { theme } from "theme";
import TodoDetail from "containers/Dashboard/TodoDetail";
import { useCreateBoardMutation, useLazyGetBoardsQuery, useUpdateBoardMutation } from "stores/services/board";
import Plus from "components/Icons/Plus";
import { BoardType } from "typings/board";
import { DndContext, DragOverEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import produce from "immer";
import { restrictToParentElement } from "@dnd-kit/modifiers";

export interface TodoByBoard {
  boardId: string | number;
  todos: TodoType[];
}

const DashboardPage = () => {
  const dispatch = useDispatch();

  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [creatingBoardName, setCreatingBoardName] = useState("");
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [todos, setTodos] = useState<TodoByBoard[]>([]);

  const user = useSelector((state: AppState) => state.common.user);
  const [getBoardsData, { data: boardsData }] = useLazyGetBoardsQuery();
  const [createBoard] = useCreateBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleSyncTodoAfterCreating = (boardId: string | number, todo: TodoType) =>
    setTodos((prev) =>
      produce(prev, (draft) => {
        const index = draft.findIndex((todo) => todo.boardId === boardId);
        if (index >= 0) {
          draft[index].todos.push(todo);
        }
      })
    );

  const handleCreateBoard = async () => {
    if (!creatingBoardName.length || !user) {
      setIsCreatingBoard(false);
      return;
    }

    try {
      const board = await createBoard({
        userId: String(user.id),
        name: creatingBoardName,
      }).unwrap();

      setBoards((prev) => [...prev, board]);
      dispatch(commonActions.showAlertMessage({ type: "success", message: "Successfully created board!" }));
    } catch (e: any) {
      dispatch(commonActions.showAlertMessage({ type: "error", message: e.data.message }));
    } finally {
      setCreatingBoardName("");
      setIsCreatingBoard(false);
    }
  };

  const handleDragOver = async ({ active, over }: DragOverEvent) => {
    if (active.id === over.id) {
      return;
    }

    const activeIndex = boards.findIndex((board) => board.id === active.id);
    const overIndex = boards.findIndex((board) => board.id === over.id);

    if (activeIndex < 0 || overIndex < 0) {
      return;
    }

    try {
      const activeBoard = boards[activeIndex];
      const overBoard = boards[overIndex];

      setBoards((prev) =>
        produce(prev, (draft) => {
          const temp = prev[activeIndex];
          draft[activeIndex] = { ...draft[activeIndex], order: draft[overIndex].order };
          draft[overIndex] = { ...draft[overIndex], order: temp.order };
        })
          .slice()
          .sort((a, b) => a.order - b.order)
      );

      await updateBoard({ userId: activeBoard.userId, id: activeBoard.id, order: overBoard.order }).unwrap();
      await updateBoard({ userId: overBoard.userId, id: overBoard.id, order: activeBoard.order }).unwrap();
    } catch (error: any) {
      dispatch(commonActions.showAlertMessage({ type: "error", message: error.data.message }));
    }
  };

  useEffect(() => {
    if (!boardsData && !!user) {
      getBoardsData({ userId: String(user.id) })
        .unwrap()
        .then((data) => setBoards(data));
    }
  }, [boardsData, getBoardsData, user]);

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
        <DndContext onDragOver={handleDragOver} sensors={sensors} modifiers={[restrictToParentElement]}>
          <SortableContext items={boards.map((board) => String(board.id))} strategy={horizontalListSortingStrategy}>
            {boards.map((board) => (
              <Board
                key={board.id}
                boardId={String(board.id)}
                name={board.name}
                setSelectedTodo={setSelectedTodo}
                setBoards={setBoards}
                setTodos={setTodos}
                todos={todos.find((todo) => todo.boardId === board.id)?.todos ?? []}
                handleSyncTodoAfterCreating={handleSyncTodoAfterCreating}
              />
            ))}
          </SortableContext>
        </DndContext>
        <Box
          minWidth={theme.spacing(34)}
          height={theme.spacing(3)}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor={theme.palette.grey[350]}
          py={1}
          px={2}
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
                InputProps={{ style: { fontSize: 16, fontWeight: 600, color: theme.palette.secondary.dark } }}
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
