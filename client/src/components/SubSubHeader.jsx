import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";

const SubSubHeader = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = theme.palette.colors
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Typography
      fontSize={isMobile ? "20px" : "14px"} 
        variant="h4"
        fontWeight="bold"
        mb={isMobile ? 0.1 : 0.5}
        color={colors.contrast[100]}
      >
        {title}
      </Typography>
      <Typography fontSize={isMobile ? "11px" : "12px"} fontStyle={'italic'} variant="h5" color={colors.contrast[200]}>
        {subtitle}
      </Typography>
      </>
  );
};

export default SubSubHeader;
