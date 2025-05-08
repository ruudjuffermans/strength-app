import { Typography, Box, useTheme, useMediaQuery, Stack } from "@mui/material";
import Icon from "../Icon";

const ContentHeading = ({ title, subtitle, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colors = theme.palette
  return (
    <Box mb={6}>
      <Stack alignItems={"center"} gap={2} direction={"row"}>

      <Typography variant={"h4"} >
        {title}
      </Typography>
      {children}
      </Stack>
      <Typography variant={"subtitle2"} fontWeight={400}  color={colors.grey[500]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default ContentHeading;
