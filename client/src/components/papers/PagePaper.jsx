import { useTheme } from '@mui/material/styles';
import { Box, Paper, useMediaQuery } from '@mui/material';
import PageHeading from '../headings/PageHeading';

const PagePaper = ({ children, title, subtitle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <Box  >
      <Box sx={{ p: 3 }}>
      <PageHeading title={title} subtitle={subtitle} />
      </Box>
      {children}
    </Box>
  ) : (
    <Box sx={{ position: "relative", backgroundColor: theme.palette.background.paper, borderRadius: 3, display: isMobile && "contents", minHeight: "calc(100vh - 200px)", m: 2, p: 2 }}>
      <PageHeading title={title} subtitle={subtitle} />
      {children}
    </Box>
  )
};

export default PagePaper;