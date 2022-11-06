import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "pages/Dashboard";
import ErrorPage from "pages/ErrorPage";
import AuthPage from "pages/Auth";
import { Box, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "stores";
import { commonActions } from "stores/slices/common";

const App = () => {
  const dispatch = useDispatch();
  const messageState = useSelector((state: AppState) => state.common.message);
  const user = useSelector((state: AppState) => state.common.user);

  return (
    <Box>
      <Snackbar
        open={messageState.open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => {
          dispatch(commonActions.hideAlertMessage());
        }}
      >
        <Alert severity={messageState.type || "info"}>{messageState.message}</Alert>
      </Snackbar>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/">
            <Route index element={user ? <DashboardPage /> : <Navigate replace to="/auth" />} />
            <Route path="auth" element={!user ? <AuthPage /> : <Navigate replace to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
