import { Typography, Box, useTheme } from "@mui/material";

const SubHeader = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = theme.palette.colors
  return (
    <Box my={2}>
      <Typography
        variant="h3"
        color={colors.contrast[100]}
      >
        {title}
      </Typography>
      <Typography variant="subtitle2" color={colors.contrast[200]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default SubHeader;
