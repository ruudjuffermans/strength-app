import { Box, IconButton, Paper, useMediaQuery } from "@mui/material";
import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useTheme } from "@emotion/react";
import { ColorModeContext, tokens } from "../../theme";

const AuthLayout = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <div className="app">
      <main className="content">
        <div style={{position: "absolute", top: "10px", right: "10px"}}>
      <IconButton onClick={colorMode.toggleColorMode} >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
          </div>
        {isNonMobile ? (
          <Box className="center-div">
            <Outlet />
          </Box>
        ) : (
          <Box p={1} height={"100%"}>
            <Outlet />
          </Box>
        )}
      </main>
    </div>
  );
};

export default AuthLayout;
