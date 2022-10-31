import { Box, IconButton, Typography } from "@mui/material";
import { theme } from "theme";
import { Priorities, TodoType } from "typings";
import LowIcon from "@mui/icons-material/KeyboardArrowRight";
import MediumIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import HighIcon from "@mui/icons-material/DoubleArrow";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface TodoProps {
  todo: TodoType;
  setSelectedTodo: (todo: TodoType | null) => void;
}

export const PRIORITY_ICONS = {
  [Priorities.LOW]: <LowIcon sx={{ fontSize: 16, color: theme.palette.primary.main, transform: "rotate(-90deg)" }} />,
  [Priorities.MEDIUM]: (
    <MediumIcon sx={{ fontSize: 16, color: theme.palette.warning.main, transform: "rotate(-90deg)" }} />
  ),
  [Priorities.HIGH]: <HighIcon sx={{ fontSize: 16, color: theme.palette.error.main, transform: "rotate(-90deg)" }} />,
};

const Todo = ({ todo, setSelectedTodo }: TodoProps) => {
  const { name, priority, color, completed } = todo;

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={0.5}
      p={1}
      bgcolor={theme.palette.common.white}
      borderRadius={1}
      boxShadow="0px 14px 6px -16px #111;"
      sx={{
        ":hover": { cursor: "pointer" },
        overflowWrap: "anywhere",
      }}
      onClick={() => setSelectedTodo(todo)}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {color && <Box width={theme.spacing(5)} height={theme.spacing(1)} bgcolor={color} borderRadius={4} />}
        <IconButton size="small">
          {completed ? (
            <CheckIcon sx={{ fontSize: 16, color: theme.palette.success.main }} />
          ) : (
            <CloseIcon sx={{ fontSize: 16, color: theme.palette.error.main }} />
          )}
        </IconButton>
      </Box>
      <Typography variant="body2" color={theme.palette.secondary.dark}>
        {name}
      </Typography>
      <Box display="flex" justifyContent="end" alignItems="center">
        <Typography component="span" variant="caption" color={theme.palette.secondary.dark}>
          {Priorities[priority].charAt(0) + Priorities[priority].slice(1).toLowerCase()}
        </Typography>
        {PRIORITY_ICONS[priority]}
      </Box>
    </Box>
  );
};

export default Todo;
