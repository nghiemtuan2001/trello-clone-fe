import { Box, IconButton, Typography } from "@mui/material";
import { theme } from "theme";
import { Priorities } from "typings/common";
import { TodoType } from "typings/todo";
import LowIcon from "@mui/icons-material/KeyboardArrowRight";
import MediumIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import HighIcon from "@mui/icons-material/DoubleArrow";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { isBefore } from "date-fns";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";

interface TodoProps {
  todo: TodoType;
  setSelectedTodo: (todo: TodoType | null) => void;
}

export const PRIORITY_ICONS = {
  LOW: <LowIcon sx={{ fontSize: 16, color: theme.palette.primary.main, transform: "rotate(-90deg)" }} />,
  MEDIUM: <MediumIcon sx={{ fontSize: 16, color: theme.palette.warning.main, transform: "rotate(-90deg)" }} />,
  HIGH: <HighIcon sx={{ fontSize: 16, color: theme.palette.error.main, transform: "rotate(-90deg)" }} />,
};

const Todo = ({ todo, setSelectedTodo }: TodoProps) => {
  const { setNodeRef, listeners, transform, transition } = useSortable({
    id: String(todo.id),
    data: { type: "row" },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { name, priority, color, completed, expireTime } = todo;

  const isExpired = isBefore(new Date(String(expireTime)), new Date());

  return (
    <Box {...listeners} sx={style} ref={setNodeRef}>
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
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
          <Box
            width={theme.spacing(5)}
            height={theme.spacing(1)}
            bgcolor={color ?? theme.palette.common.white}
            border={1}
            borderColor={theme.palette.grey[200]}
            borderRadius={4}
          />
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            {isExpired && (
              <Typography variant="caption" fontWeight="bold" color={theme.palette.error.main}>
                Expired
              </Typography>
            )}
          </Box>
          <Box display="flex" alignItems="center">
            <Typography component="span" variant="caption" color={theme.palette.secondary.dark}>
              {Priorities[(priority as "LOW") ?? "LOW"]}
            </Typography>
            {PRIORITY_ICONS[(priority as "LOW") ?? "LOW"]}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Todo;
