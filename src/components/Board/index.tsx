import { Box, Typography, IconButton, Button } from "@mui/material";
import PlusIcon from "components/Icons/Plus";
import ThreeDotsIcon from "components/Icons/ThreeDots";
import Todo from "components/Todo";
import { theme } from "theme";
import { Priorities, TodoType } from "typings";

interface BoardProps {
  name: string;
  setSelectedTodo: (todo: TodoType | null) => void;
}

const MOCK_TODOS: TodoType[] = [
  {
    id: 1,
    name: "todo",
    priority: Priorities.LOW,
    startTime: new Date(),
    expireTime: new Date(),
    description: "Desc....",
    color: "#000000",
    completed: true,
  },
  {
    id: 2,
    name: "todo",
    priority: Priorities.MEDIUM,
    startTime: new Date(),
    expireTime: new Date(),
    description: "Desc....",
    color: "#000000",
    completed: false,
  },
  {
    id: 3,
    name: "todo",
    priority: Priorities.HIGH,
    startTime: new Date(),
    expireTime: new Date(),
    description: "Desc....",
    color: "#000000",
    completed: true,
  },
];

const Board = ({ name, setSelectedTodo }: BoardProps) => {
  return (
    <Box
      maxHeight={`calc(100vh - ${theme.spacing(19)})`}
      width={theme.spacing(34)}
      display="flex"
      flexDirection="column"
      alignSelf="start"
      bgcolor={theme.palette.grey[350]}
      p={1}
      borderRadius={1}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body1" fontWeight="bold" ml={0.5}>
          {name}
        </Typography>
        <IconButton size="medium">
          <ThreeDotsIcon />
        </IconButton>
      </Box>
      <Box display="grid" gap={1} height="100%" overflow="auto">
        {MOCK_TODOS?.map((todo, index) => (
          <Todo key={index} todo={todo} setSelectedTodo={setSelectedTodo} />
        ))}
      </Box>
      <Button size="small" fullWidth sx={{ pb: 0.25 }}>
        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color={theme.palette.grey[600]}>
            Add a todo
          </Typography>
          <PlusIcon color={theme.palette.grey[600]} />
        </Box>
      </Button>
    </Box>
  );
};

export default Board;
