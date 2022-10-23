import { TabUnstyledProps } from "@mui/base";
import { ButtonBase } from "@mui/material";
import React from "react";

import { StyledTab } from "./Tab.styled";

const TNTab = ({ ...props }: TabUnstyledProps) => {
  return <StyledTab component={ButtonBase} {...props} />;
};

export default TNTab;
