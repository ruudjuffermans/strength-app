import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";

const InnerHeading = ({ title, subtitle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colors = theme.palette
  return (
    <Box mb={4}>
      <Typography variant={"h6"} fontWeight={400} fontSize={"16px"} color={colors.grey[300]} >
        {title}
      </Typography>
      <Typography variant={"subtitle2"} fontWeight={400} fontSize={"14px"}  color={colors.grey[500]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default InnerHeading;
