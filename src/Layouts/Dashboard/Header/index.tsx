import { Box, Button, Typography } from "@mui/material";
import LogoIcon from "components/Icons/Logo";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppState } from "stores";
import { theme } from "theme";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state: AppState) => state.common.user);

  return (
    <Box display="flex" justifyContent="space-between" px={2} py={1} bgcolor="rgba(228, 188, 185, 0.549)">
      <Box display="flex">
        <Box
          display="flex"
          alignItems="center"
          gap={0.5}
          px={1}
          py={0.5}
          bgcolor={theme.palette.grey[50]}
          borderRadius={1.5}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <LogoIcon width={40} height={40} />
          <Typography variant="h5" color={theme.palette.secondary.dark}>
            Trello Shopee
          </Typography>
        </Box>
      </Box>
      {user ? (
        <Box
          display="flex"
          alignItems="center"
          bgcolor={theme.palette.grey[50]}
          gap={0.5}
          px={1}
          py={0.5}
          borderRadius={1.5}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Typography variant="body2" color={theme.palette.secondary.dark}>
            {`Hello, ${user.userName}`}
          </Typography>
        </Box>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          sx={{ backgroundColor: theme.palette.grey[50] }}
          onClick={() => navigate("/auth")}
        >
          <Typography fontWeight="bold" color={theme.palette.secondary.dark}>
            Sign in
          </Typography>
        </Button>
      )}
    </Box>
  );
};

export default Header;
