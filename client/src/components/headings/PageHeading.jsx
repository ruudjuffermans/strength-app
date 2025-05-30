import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";

const PageHeading = ({ title, subtitle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colors = theme.palette
  return (
    <Box my={isMobile ? 4 : 6}>
      <Typography color={colors.grey[200]} variant={"h1"} >
        {title}
      </Typography>
      <Typography variant={"subtitle1"}   color={colors.grey[500]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default PageHeading;
