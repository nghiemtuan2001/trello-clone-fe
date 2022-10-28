import { Button, Typography } from "@mui/material";
import { AppState } from "stores";
import { useDispatch, useSelector } from "react-redux";
import { useGetTodosQuery } from "stores/services/todo";
import { commonActions } from "stores/slices/common";
import DashboardLayout from "Layouts/Dashboard";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { data: todosData } = useGetTodosQuery();

  const message = useSelector((state: AppState) => state.common.message);

  const handleChangeMessage = () => {
    dispatch(commonActions.setMessage("new message!"));
  };

  return (
    <DashboardLayout>
      <Button onClick={handleChangeMessage}>Click to set message</Button>
      <Typography>{message}</Typography>
    </DashboardLayout>
  );
};

export default DashboardPage;
