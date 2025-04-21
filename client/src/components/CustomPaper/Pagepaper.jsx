import CustomPaper from '@components/CustomPaper';
import Header from '@components/Header';

import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

const PagePaper = ({ children, title, subtitle, PageButton }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  
  return (
    <Box m={isMobile ? "6px" : "18px"}>
      <CustomPaper sx={{ minHeight: isMobile ? "calc(100vh - 80px)" : "calc(100vh - 100px)", padding: isMobile ? "12px" : "18px" }}>
        <Box display="flex" justifyContent="space-between">
          <Header title={title} subtitle={subtitle} />
          <Box>
            {PageButton}
          </Box>
        </Box>
      {children}
    </CustomPaper>
    </Box>
  );
};

export default PagePaper;