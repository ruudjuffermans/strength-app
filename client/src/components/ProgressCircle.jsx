import { Box, useTheme } from "@mui/material";

const ProgressCircle = ({ progress = "0.75", size = "62" }) => {
  const theme = useTheme();
  const colors = theme.palette
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
