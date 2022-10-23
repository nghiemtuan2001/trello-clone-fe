import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error: any = useRouteError();

  return (
    <Box height="100vh" display="flex" alignItems="center">
      <Box display="flex" flexDirection="column" gap={2} mx="auto">
        <Box>
          <h1>Oops! Page not found!</h1>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </Box>
        <Button variant="contained" onClick={() => navigate("/")} fullWidth>
          Back to dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;
