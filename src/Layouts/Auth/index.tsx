import { Box, Grid, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { theme } from "theme";

interface AuthLayoutProps {
  header: string;
  description?: ReactNode;
  children: ReactNode;
}

const AuthLayout = ({ header, description, children, ...props }: AuthLayoutProps) => {
  return (
    <Box height="100vh" display="flex" bgcolor={theme.palette.grey[50]}>
      <Grid
        container
        sx={{
          justifyContent: "center",
        }}
        {...props}
      >
        <Grid
          item
          sx={{
            width: theme.spacing(84),
            backgroundColor: theme.palette.common.white,
            [theme.breakpoints.up("sm")]: { my: 6, borderRadius: theme.spacing(2), alignSelf: "flex-start" },
          }}
        >
          <Box p={4}>
            <Box mb={4}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: theme.spacing(2.75),
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                }}
              >
                {header}
              </Typography>
              {!!description && (
                <Typography variant="body1" color={theme.palette.grey[700]}>
                  {description}
                </Typography>
              )}
            </Box>
            {children}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthLayout;
