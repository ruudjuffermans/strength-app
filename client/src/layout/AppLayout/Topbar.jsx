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
import CustomInput from "../../components/CustomInput";

const Topbar = ({ open, setOpen, user }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = theme.palette;
  const colorMode = useContext(ColorModeContext);
  const { isMobile } = useResponsive();
  const content = (
    <Box display="flex" justifyContent="flex-end" alignItems="center" p={1}>
      {isMobile ? (
        <IconButton size={"medium"} icon={"menu"} onClick={() => setOpen(!open)} />
      ) : (
        <>
          <Box
            display="flex"
            borderRadius={2}
          >
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
        backgroundColor: theme.palette.background.default,
        borderBottom: "1px solid rgba(255,255,255,8%)"
      }}
    >
      {content}
    </Box>
  ) : (
    <Box m={3}>{content}</Box>
  );
};

export default Topbar;
