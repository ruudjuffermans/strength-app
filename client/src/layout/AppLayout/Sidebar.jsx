import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "@theme";
import {
  LogoutOutlinedIcon,
  MenuOutlinedIcon,
  HomeOutlinedIcon,
  HelpOutlineOutlinedIcon,
  QuestionAnswerOutlinedIcon,
  SettingsOutlinedIcon,
  TableChartOutlinedIcon,
  FitnessCenterIcon,
  WorkOutlineOutlinedIcon,
} from "@icons";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();

  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        borderRight: `1px solid ${colors.base[500]}`,
        "& .pro-sidebar-inner": {
          minHeight: "100vh",
          background: `${
            theme.palette.mode === "dark" ? colors.base[200] : colors.base[100]
          } !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 0px 5px 5px !important",
        },
        "& .pro-menu-item": {
          color: `${colors.contrast[200]}`,
          padding: "0px 25px 0px 20px !important",
        },
        "& .pro-menu-item:hover:not(.active)": {
          color: `${colors.contrast[100]}`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.primary[500]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          height={"100%"}
        >
          <Menu iconShape="square">
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "0 0 40px 0",
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h3" color={colors.primary[500]}>
                    CLIENT
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Programs"
                to="/programs"
                icon={<WorkOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Exercises"
                to="/exercises"
                icon={<FitnessCenterIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Workout"
                to="/workout"
                icon={<FitnessCenterIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
          <Menu>
            <Box paddingLeft={isCollapsed ? undefined : "5%"}>
              <Item
                title="Settings"
                to="/settings"
                icon={<SettingsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Help & Support"
                to="/support"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Logout"
                to="/login"
                icon={<LogoutOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </Box>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
