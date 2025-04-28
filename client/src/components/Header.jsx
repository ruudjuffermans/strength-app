import { Typography, Box, useTheme } from "@mui/material";

const Header = ({ title, subtitle, sub=false }) => {
  const theme = useTheme();
  const colors = theme.palette.colors
  return (
    <Box mb={sub ? 2 : 6}>
      <Typography variant={sub ? "h2" : "h1"} >
        {title}
      </Typography>
      <Typography variant={sub ? "subtitle2" : "subtitle1"} fontWeight={300}  color={colors.contrast[100]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
