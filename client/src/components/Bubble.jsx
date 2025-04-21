import React from "react";
import { Chip, useMediaQuery, useTheme } from "@mui/material";
import { getColors } from "../theme";

const Bubble = ({ label, onClick }) => {
  const theme = useTheme();
  const colors = getColors(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Chip
      label={label}
      color={colors.base[500]}
      variant="filled"
      onClick={onClick}
      sx={{
        fontWeight: 500,
        fontSize: "15px",
        height: "22px",
        p: 1,
        borderRadius: "10px",
        cursor: onClick ? "pointer" : "default",
      }}
    />
  );
};

export default Bubble;
