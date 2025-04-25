import { Typography, Box, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = theme.palette.colors
  return (
    <Box mb={6}>
      <Typography variant="h1" >
        {title}
      </Typography>
      <Typography variant="subtitle1" color={colors.contrast[200]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
