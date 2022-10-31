import { Box } from "@mui/material";
import React from "react";
import Header from "./Header";

import { theme } from "theme";
import SubHeader from "./SubHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Box width="100vw" height="100vh">
      <Header />
      <Box
        position="relative"
        height={`calc(100vh - ${theme.spacing(8)})`}
        sx={{
          background: `url(/images/trel-bg.png) no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <SubHeader />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
