import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";

const ContentHeading = ({ title, subtitle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colors = theme.palette
  return (
    <Box mb={6}>
      <Typography variant={"h4"} >
        {title}
      </Typography>
      <Typography variant={"subtitle2"} fontWeight={400}  color={colors.grey[500]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default ContentHeading;
