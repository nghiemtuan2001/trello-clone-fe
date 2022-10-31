import { Box, Button, Popover, TextField, Typography } from "@mui/material";
import TNModal from "components/Modal";
import { EMPTY_CONTENT } from "constants/common";
import { ReactNode, useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { theme } from "theme";
import { Priorities, TodoType } from "typings";
import TaskIcon from "@mui/icons-material/ContentPaste";
import LayersIcon from "@mui/icons-material/Layers";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { ChromePicker, ColorResult } from "react-color";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateTimePicker } from "@mui/x-date-pickers";
import TNTextarea from "components/Input/Textarea";
import { PRIORITY_ICONS } from "components/Todo";
import { SxProps, Theme } from "@mui/system";

interface TodoDetailProps {
  todo: TodoType | null;
  setSelectedTodo: (todo: TodoType | null) => void;
}

interface FormProps extends Omit<TodoType, "id"> {}

interface ContentBoxProps {
  children: ReactNode;
  label?: string;
}

const textFieldSx: SxProps<Theme> = {
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
    priority: Yup.number(),
    startTime: Yup.date(),
    expireTime: Yup.date(),
    completed: Yup.boolean(),
  });

  const { watch, register, setValue, handleSubmit, reset } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleChangeComplete = (color: ColorResult) => {
    setValue("color", color.hex);
  };

  const onSubmit = (values: FormProps) => {
    console.log(values);
  };

  useEffect(() => {
    reset({
      name: todo?.name ?? EMPTY_CONTENT,
      description: todo?.description ?? EMPTY_CONTENT,
      color: todo?.color ?? "#ffffff",
      priority: todo?.priority,
      startTime: todo?.startTime ?? new Date(),
      expireTime: todo?.expireTime ?? new Date(),
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
                <Typography component="span" variant="caption" color={theme.palette.secondary.dark}>
                  {Priorities[watch("priority") ?? Priorities.LOW].charAt(0) +
                    Priorities[watch("priority") ?? Priorities.LOW].slice(1).toLowerCase()}
                </Typography>
                {PRIORITY_ICONS[watch("priority")]}
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
                value={watch("startTime")}
                onChange={(newValue) => setValue("startTime", newValue ?? new Date())}
                renderInput={(params) => <TextField {...params} />}
                disablePast
              />
              <DateTimePicker
                label="Expire time"
                value={watch("expireTime")}
                onChange={(newValue) => setValue("expireTime", newValue ?? new Date())}
                renderInput={(params) => <TextField {...params} />}
                disablePast
              />
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
      </Box>
    </TNModal>
  );
};

export default TodoDetail;
