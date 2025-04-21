import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { getColors } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = getColors(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box mb={isMobile ? "12px" : "24px"}>
      <Typography
      fontSize={isMobile ? "18px" : "32px"} 
        variant="h2"
        fontWeight="bold"
        mb={isMobile ? 0 : 1}
        color={colors.contrast[100]}
      >
        {title}
      </Typography>
      <Typography fontSize={isMobile ? "14px" : "17px"} variant="h3" color={colors.contrast[200]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
