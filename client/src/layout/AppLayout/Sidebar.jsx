import { useState, useEffect, useRef } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Backdrop,
} from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";

import Icon from "@components/Icon";
import { useAuth } from "@context/AuthContext";



const Item = ({ title, to, icon, selected, setSelected, onItemClick }) => (
  <MenuItem
    active={selected === title}
    onClick={() => {
      setSelected(title);
      onItemClick?.(); // Optional chaining in case it's undefined
    }}
    icon={icon}
  >
    <Typography>{title}</Typography>
    <Link to={to} />
  </MenuItem>
);

const Sidebar = ({ open, setOpen, user }) => {
  const theme = useTheme();
  const { logout } = useAuth();
  const colors = theme.palette.colors
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selected, setSelected] = useState("Dashboard");
  const sidebarRef = useRef(null);

  const isAdmin = user.role === "Admin"
  const handleClose = () => setOpen(false);

  const handleLogout = async () => {
    await logout();

  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isMobile && open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, isMobile]);

  return (
    <>
      {isMobile && (
        <Backdrop
          open={open}
          onClick={handleClose}
          sx={{
            bgcolor:
              theme.palette.mode === "light"
                ? "rgba(0, 0, 0, 0.3)"
                : "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
          }}
        />
      )}

      <Box
        ref={sidebarRef}
        sx={{
          position: isMobile ? "fixed" : "relative",
          top: 0,
          left: isMobile ? (open ? "0px" : "-300px") : 0,
          width: isMobile ? "250px" : "auto",
          transition: isMobile ? "left 0.3s ease-in-out" : "none",
          height: "100vh",
          zIndex: 101,
          borderRight: `1px solid ${colors.base[500]}`,
          "& .pro-sidebar-inner": {
            background: `${theme.palette.mode === "dark"
              ? colors.base[200]
              : colors.base[100]
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
        <ProSidebar collapsed={!isMobile ? open : false}>
          <Box display="flex" flexDirection="column" height="100%">
            <Box sx={{ flex: 1 }}>
              <Menu iconShape="square">
                <MenuItem
                  onClick={isMobile ? handleClose : () => setOpen(!open)}
                  icon={open ? <Icon name={"menu"} /> : undefined}
                  style={{ marginBottom: "40px" }}
                >
                  {!open && !isMobile && (
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h3" color={colors.primary[500]}>
                        CLIENT
                      </Typography>
                      <IconButton icon={"menu"} onClick={() => setOpen(!open)} />
                    </Box>
                  )}
                </MenuItem>

                <Box paddingLeft={!open && !isMobile ? "10%" : undefined}>
                  <Item onItemClick={isMobile ? handleClose : undefined} title="Dashboard" to="/" icon={<Icon name={"home"} />} selected={selected} setSelected={setSelected} />
                  <Item onItemClick={isMobile ? handleClose : undefined} title="Programs" to="/programs" icon={<Icon name={"work"} />} selected={selected} setSelected={setSelected} />
                  <Item onItemClick={isMobile ? handleClose : undefined} title="Exercises" to="/exercises" icon={<Icon name={"fitness"} />} selected={selected} setSelected={setSelected} />
                  <Item onItemClick={isMobile ? handleClose : undefined} title="Workouts" to="/workouts" icon={<Icon name={"workouts"} />} selected={selected} setSelected={setSelected} />
                  {isAdmin && <Item onItemClick={isMobile ? handleClose : undefined} title="Users" to="/users" icon={<Icon name={"people"} />} selected={selected} setSelected={setSelected} />}
                </Box>
              </Menu>
            </Box>
            <Box mb={40}>

              <Menu>
                <Box paddingLeft={!open && !isMobile ? "5%" : undefined}>
                  <Item onItemClick={isMobile ? handleClose : undefined} title="Settings" to="/settings" icon={<Icon name={"settings"} />} selected={selected} setSelected={setSelected} />
                  <Item onItemClick={isMobile ? handleClose : undefined} title="Help & Support" to="/support" icon={<Icon name={"help"} />} selected={selected} setSelected={setSelected} />
                  <MenuItem
                    icon={<Icon name={"logout"} />}
                    onClick={async () => {
                      if (isMobile) handleClose();
                      await handleLogout();
                    }}
                  >
                    <Typography>Logout</Typography>
                  </MenuItem> </Box>
              </Menu>
            </Box>
          </Box>
        </ProSidebar>
      </Box>
    </>
  );
};

export default Sidebar;
