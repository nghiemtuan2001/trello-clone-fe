import { Box, Button, MenuItem, Popover, Select, TextField, Typography } from "@mui/material";
import TNModal from "components/Modal";
import { EMPTY_CONTENT } from "constants/common";
import { ReactNode, useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { theme } from "theme";
import { Priorities } from "typings/common";
import { TodoType } from "typings/todo";
import TaskIcon from "@mui/icons-material/ContentPaste";
import LayersIcon from "@mui/icons-material/Layers";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { ChromePicker, ColorResult } from "react-color";
import { DateTimePicker } from "@mui/x-date-pickers";
import TNTextarea from "components/Input/Textarea";
import { PRIORITY_ICONS } from "components/Todo";
import { SxProps, Theme } from "@mui/system";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "stores/services/todo";
import { useDispatch } from "react-redux";
import { commonActions } from "stores/slices/common";
import { pick } from "lodash";
import { isBefore } from "date-fns/esm";

interface TodoDetailProps {
  todo: TodoType | null;
  setSelectedTodo: (todo: TodoType | null) => void;
}

interface FormProps extends Omit<TodoType, "id"> {}

interface ContentBoxProps {
  children: ReactNode;
  label?: string;
}

export const textFieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
  },
  "&": {
    ":hover": {
      ".MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
    ".MuiOutlinedInput-input": {
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    },
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  },
};

const ContentBox = ({ label, children }: ContentBoxProps) => {
  return (
    <Box py={2}>
      {label && (
        <Box display="flex" gap={1} mb={2}>
          <LayersIcon sx={{ fontSize: 24, color: theme.palette.secondary.dark }} />
          <Typography color={theme.palette.secondary.dark} fontWeight="bold" textTransform="capitalize">
            {label}:
          </Typography>
        </Box>
      )}
      {children}
    </Box>
  );
};

const TodoDetail = ({ todo, setSelectedTodo }: TodoDetailProps) => {
  const schema = Yup.object({
    name: Yup.string(),
    description: Yup.string(),
    color: Yup.string(),
    priority: Yup.string(),
    startTime: Yup.string(),
    expireTime: Yup.string(),
    completed: Yup.boolean(),
  });
  const { watch, register, setValue, handleSubmit, reset } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleChangeComplete = (color: ColorResult) => {
    setValue("color", color.hex);
  };

  const onSubmit = async (values: FormProps) => {
    if (todo) {
      const updatedFields = Object.keys(values).filter((field) => (values as any)[field] !== (todo as any)[field]);

      if (!updatedFields.length) return;

      try {
        await updateTodo({
          ...pick(values, updatedFields),
          id: todo.id,
          boardId: todo.boardId,
        }).unwrap();
        dispatch(commonActions.showAlertMessage({ type: "success", message: "Successfully updated task!" }));
      } catch (error: any) {
        dispatch(commonActions.showAlertMessage({ type: "error", message: error.data.message }));
      }
    }
  };

  const handleDeleteTodo = async () => {
    if (todo) {
      try {
        await deleteTodo({ boardId: String(todo.boardId), id: String(todo.id) }).unwrap();
        setSelectedTodo(null);
        dispatch(commonActions.showAlertMessage({ type: "success", message: "Successfully deleted task!" }));
      } catch (error: any) {
        dispatch(commonActions.showAlertMessage({ type: "error", message: error.data.message }));
      }
    }
  };

  useEffect(() => {
    reset({
      name: todo?.name ?? EMPTY_CONTENT,
      description: todo?.description ?? EMPTY_CONTENT,
      color: todo?.color ?? "#ffffff",
      priority: todo?.priority ?? "LOW",
      startTime: todo?.startTime ?? new Date().toISOString(),
      expireTime: todo?.expireTime ?? new Date().toISOString(),
      completed: todo?.completed,
    });
  }, [reset, todo]);

  return (
    <TNModal
      open={!!todo}
      title={todo?.name ?? EMPTY_CONTENT}
      onClose={() => {
        handleSubmit(onSubmit)();
        setSelectedTodo(null);
      }}
    >
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ChromePicker color={watch("color")} onChange={handleChangeComplete} />
      </Popover>
      <Box width="100%" display="grid" gap={2}>
        <Box display="flex" alignItems="center" gap={0.5}>
          <TaskIcon sx={{ fontSize: 24, color: theme.palette.secondary.dark }} />
          <TextField
            InputProps={{ style: { fontSize: 20, fontWeight: 600, color: theme.palette.secondary.dark } }}
            inputProps={{
              ...register("name"),
            }}
            value={watch("name")}
            onChange={(e) => setValue("name", e.target.value)}
            variant="outlined"
            size="small"
            sx={textFieldSx}
          />
        </Box>
        <ContentBox>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" fontWeight={600} color={theme.palette.primary.main}>
                Label:
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    display="inline-block"
                    width={20}
                    height={20}
                    borderRadius={4}
                    bgcolor={watch("color")}
                    border={1}
                  />
                  <Typography component="span" variant="body2">
                    {watch("color")}
                  </Typography>
                </Box>
              </Button>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" fontWeight={600} color={theme.palette.primary.main}>
                Priority:
              </Typography>
              <Box display="flex" justifyContent="end" alignItems="center">
                <Select
                  value={watch("priority")}
                  renderValue={(value) => (
                    <Box display="flex" alignItems="center">
                      {Priorities[value as "LOW"]}
                      {PRIORITY_ICONS[value as "LOW"]}
                    </Box>
                  )}
                  onChange={(e) => setValue("priority", e.target.value)}
                  displayEmpty
                >
                  <MenuItem value={Priorities.LOW.toUpperCase()}>{Priorities.LOW}</MenuItem>
                  <MenuItem value={Priorities.MEDIUM.toUpperCase()}>{Priorities.MEDIUM}</MenuItem>
                  <MenuItem value={Priorities.HIGH.toUpperCase()}>{Priorities.HIGH}</MenuItem>
                </Select>
              </Box>
            </Box>
            <Box>
              <Button
                variant="contained"
                size="small"
                color={watch("completed") ? "success" : "error"}
                startIcon={watch("completed") ? <CheckIcon /> : <CloseIcon />}
                sx={{ minWidth: theme.spacing(18) }}
                onClick={() => setValue("completed", !watch("completed"))}
              >
                {watch("completed") ? "Completed" : "Uncompleted"}
              </Button>
            </Box>
          </Box>
        </ContentBox>
        {!!watch("startTime") && !!watch("startTime") && (
          <ContentBox label="date">
            <Box width="100%" display="flex" gap={2}>
              <DateTimePicker
                label="Start time"
                value={String(watch("startTime"))}
                onChange={(newValue) =>
                  setValue("startTime", newValue ? new Date(newValue).toISOString() : new Date().toISOString())
                }
                renderInput={(params) => <TextField {...params} />}
                disablePast
              />
              <DateTimePicker
                label="Expire time"
                value={String(watch("expireTime"))}
                onChange={(newValue) =>
                  setValue("expireTime", newValue ? new Date(newValue).toISOString() : new Date().toISOString())
                }
                renderInput={(params) => <TextField {...params} />}
                disablePast
              />
              {isBefore(new Date(String(watch("expireTime"))), new Date()) && (
                <Button variant="contained" color="error" sx={{ pointerEvents: "none" }}>
                  Expired
                </Button>
              )}
            </Box>
          </ContentBox>
        )}
        <ContentBox label="Description">
          <TNTextarea
            placeholder={!watch("description")?.length ? "Write here..." : undefined}
            value={watch("description")}
            onChange={(e) => setValue("description", e.target.value)}
            fullWidth
          />
        </ContentBox>
        <Button variant="contained" color="error" size="small" onClick={handleDeleteTodo}>
          Delete
        </Button>
      </Box>
    </TNModal>
  );
};

export default TodoDetail;
