import { TabsUnstyled, TabsUnstyledProps } from "@mui/base";
import React, { ReactNode } from "react";

import { TabsListStyled } from "./Tabs.styled";

interface YLTabsProps extends TabsUnstyledProps {
  children: ReactNode;
}

const TNTabs = ({ children, ...props }: YLTabsProps) => {
  return (
    <TabsUnstyled {...props}>
      <TabsListStyled>{children}</TabsListStyled>
    </TabsUnstyled>
  );
};

export default TNTabs;
