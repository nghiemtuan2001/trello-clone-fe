import { Box } from "@mui/material";
import React from "react";
import Header from "./Header";

import { theme } from "theme";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Box>
      <Header />
      <Box
        position="relative"
        height={`calc(100vh - ${theme.spacing(8)})`}
        sx={{
          background: `url(/images/trel-bg.png) no-repeat`,
          backgroundSize: "cover",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
