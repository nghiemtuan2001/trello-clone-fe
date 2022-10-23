import { Box } from "@mui/material";
import { AuthTabs } from ".";
import TNTabs from "components/Tabs";
import TNTab from "components/Tabs/Tab";

interface TabRowsProps {
  tab: AuthTabs;
  setTab: (tag: AuthTabs) => void;
}

const TabRows = ({ tab, setTab }: TabRowsProps) => {
  return (
    <Box mb={3}>
      <TNTabs value={tab} onChange={(_, tab) => setTab(tab as AuthTabs)}>
        <TNTab value={AuthTabs.SignIn}>Sign in</TNTab>
        <TNTab value={AuthTabs.SignUp}>Sign up</TNTab>
      </TNTabs>
    </Box>
  );
};

export default TabRows;
