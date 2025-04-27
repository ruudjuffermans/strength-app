import {
  Box,
  IconButton,
  InputBase,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext  } from "@theme";
import Icon from "@components/Icon";
import useResponsive from "../../hooks/useResponsive";
import OptionsMenu from "../../components/OptionsMenu";
import { useNavigate } from "react-router-dom";

const Topbar = ({ open, setOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = theme.palette.colors;
  const colorMode = useContext(ColorModeContext);
  const {isMobile} = useResponsive();

  const content = (
    <Box display="flex" backgroundColor={ isMobile && colors.base[400]} justifyContent="space-between" alignItems="center" p={2}>
      {isMobile ? (
        <IconButton onClick={() => setOpen(!open)}>
          <Icon size={"large"} name={"menu"} />
        </IconButton>
      ) : (
        <>
          <Box
            display="flex"
            backgroundColor={colors.base[200]} 
            borderRadius={2}
          >
            <InputBase sx={{ p: 2, pl:4,  flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <Icon name={"search"} sx={{ color: colors.base[900] }} />
            </IconButton>
          </Box>

          <Box display="flex">
            {/* <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? <Icon name={"dark"} /> : <Icon name={'light'} />}
            </IconButton> */}
  <OptionsMenu
    options={[
      { label: "Profile", icon: "user", onClick: () => navigate("/profile") },
      { label: "Settings", icon: "settings", onClick: () => navigate("/settings") },
      { label: "Logout", icon: "logout", onClick: () => navigate("/logout") }
    ]}
    triggerButton={
      <IconButton>
        <Icon name="user" />
      </IconButton>
    }
  />
          </Box>
        </>
      )}
    </Box>
  );

  return isMobile ? (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: theme.palette.background.default,
        mb: "12px",
      }}
    >
      {content}
    </Box>
  ) : (
    <Box m="10px">{content}</Box>
  );
};

export default Topbar;
