import { Box, Paper, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({ progress = "0.75", size = "62" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${theme.palette.mode === "dark" ? "#212121" : "#fff"} 45%, transparent 46%),conic-gradient(transparent 0deg ${angle}deg, ${theme.palette.mode === "dark" ? "#212121" : "#fff"} ${angle}deg 360deg),${colors.primary[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
