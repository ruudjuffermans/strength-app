import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";

const PageHeading = ({ title, subtitle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colors = theme.palette
  return (
    <Box mb={isMobile ? 2 : 6}>
      <Typography variant={"h1"} >
        {title}
      </Typography>
      <Typography variant={"subtitle1"} fontWeight={400}  color={colors.grey[500]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default PageHeading;
