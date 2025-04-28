import {
  Box,
  InputBase,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "@theme";
import useResponsive from "../../hooks/useResponsive";
import OptionsMenu from "../../components/OptionsMenu";
import { useNavigate } from "react-router-dom";
import IconButton from "@components/buttons/IconButton";

const Topbar = ({ open, setOpen, user }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = theme.palette.colors;
  const colorMode = useContext(ColorModeContext);
  const { isMobile } = useResponsive();
  console.log(user)
  const content = (
    <Box display="flex" backgroundColor={isMobile && colors.base[400]} justifyContent="space-between" alignItems="center" p={2}>
      {isMobile ? (
        <IconButton size={"medium"} icon={"menu"} onClick={() => setOpen(!open)} />
      ) : (
        <>
          <Box
            display="flex"
            backgroundColor={colors.base[200]}
            borderRadius={2}
          >
            <InputBase sx={{ p: 2, pl: 4, flex: 1 }} placeholder="Search" />
            <IconButton icon={"search"} type="button" sx={{ p: 1 }} />
          </Box>
          <Box display="flex">
            <OptionsMenu
              options={[
                { label: "Profile", icon: "user", onClick: () => navigate("/profile") },
                { label: "Settings", icon: "settings", onClick: () => navigate("/settings") },
                { label: "Logout", icon: "logout", onClick: () => navigate("/logout") }
              ]}
              triggerButton={<IconButton icon={"admin"} />}
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
