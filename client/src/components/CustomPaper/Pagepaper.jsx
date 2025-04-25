import CustomPaper from '@components/CustomPaper';
import Header from '@components/Header';

import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

const PagePaper = ({ children, title, subtitle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box m={isMobile ? "12px" : "18px"} pb={isMobile && "48px"}>
      <CustomPaper sx={{ display: isMobile && "contents", minHeight: "calc(100vh - 80px)", padding: "18px" }}>
        <Header title={title} subtitle={subtitle} />
        {children}
      </CustomPaper>
    </Box>
  );
};

export default PagePaper;