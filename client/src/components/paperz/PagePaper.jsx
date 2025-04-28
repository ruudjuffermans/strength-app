import BasePaper from './BasePaper';
import Header from '@components/Header';

import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

const PagePaper = ({ children, title, subtitle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box m={isMobile ? 2 : 7} pt={isMobile && 6} pb={isMobile && 12}>
      <BasePaper sx={{ display: isMobile && "contents", minHeight: "calc(100vh - 80px)" }}>
        <Header title={title} subtitle={subtitle} />
        {children}
      </BasePaper>
    </Box>
  );
};

export default PagePaper;