import {
  Box,
  IconButton,
  InputBase,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useContext } from "react";
import CustomPaper from "@components/CustomPaper";
import { ColorModeContext, getColors } from "@theme";
import {
  LightModeIcon,
  DarkModeIcon,
  NotificationsIcon,
  SettingsIcon,
  PersonIcon,
  SearchIcon,
  MenuIcon,
} from "@icons";

const Topbar = ({ open, setOpen }) => {
  const theme = useTheme();
  const colors = getColors(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery("(max-width:600px)");

  const content = (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
      {isMobile ? (
        <IconButton onClick={() => setOpen(!open)}>
          <MenuIcon />
        </IconButton>
      ) : (
        <>
          <Box
            display="flex"
            backgroundColor={colors.base[300]}
            borderRadius="3px"
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon sx={{ color: colors.base[900] }} />
            </IconButton>
          </Box>

          <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
            <IconButton>
              <PersonIcon />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <Box m={isMobile ? "6px" : "10px"}>
      {isMobile ? <CustomPaper>{content}</CustomPaper> : content}
    </Box>
  );
};

export default Topbar;
