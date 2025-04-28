import { Box, useMediaQuery } from "@mui/material";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { ColorModeContext } from "../../theme";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";

const AuthLayout = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <Header />
      <Box 
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box
          width="100%"
          maxWidth="400px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <Outlet />
          <Navigation />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AuthLayout;
