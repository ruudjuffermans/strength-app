import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { getColors } from "../theme";

const SubHeader = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = getColors(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box mb={isMobile ? "6px" : "12px"}>
      <Typography
      fontSize={isMobile ? "14px" : "20px"} 
        variant="h4"
        fontWeight="bold"
        mb={isMobile ? 0.1 : 0.5}
        color={colors.contrast[100]}
      >
        {title}
      </Typography>
      <Typography fontSize={isMobile ? "12px" : "14px"} fontStyle={'italic'} variant="h5" color={colors.contrast[200]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default SubHeader;
