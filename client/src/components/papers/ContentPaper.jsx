import { useTheme } from '@mui/material/styles';
import { Box, Paper, useMediaQuery } from '@mui/material';

const ContentPaper = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <Box sx={{
      position: "relative",
      p: 3,
      py: 4,
      borderRadius: 0,
      backgroundColor: theme.palette.background[100],
      borderTop: `1px solid ${theme.palette.background[200]}`,
      borderBottom: `1px solid ${theme.palette.background[200]}`
    }}>
      {children}
    </Box>
  ) : (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        backgroundColor: theme.palette.background[100],
        p: 4,
        border: `1px solid ${theme.palette.background[200]}`,
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
      }}
    >
      {children}
    </Box>
  );
};

export default ContentPaper;