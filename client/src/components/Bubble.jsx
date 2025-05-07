import React from "react";
import { Chip, useMediaQuery, useTheme } from "@mui/material";

const Bubble = ({ label, onClick }) => {
  const theme = useTheme();
  const colors = theme.palette
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Chip
      label={label}
      onClick={onClick}
      sx={{
        backgroundColor: colors.grey[300],
        cursor: onClick ? "pointer" : "default",
      }}
    />
  );
};

export default Bubble;
