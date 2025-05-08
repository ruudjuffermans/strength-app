import { useTheme } from '@mui/material/styles';
import { Box, Paper, useMediaQuery } from '@mui/material';

const InnerPaper = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <Box
    sx={{
      position: "relative",
      borderRadius: 2,
      boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 6px 0px rgba(0,0,0,0.12)",
      borderBottom: `1px solid ${theme.palette.background[200]}`,
      borderTop: `1px solid ${theme.palette.background[200]}`,
      backgroundColor: theme.palette.background[200],
      p: 2,
    }}
  >  {children}
    </Box>
  ) : (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        backgroundColor:  theme.palette.background[200],
        p: 3,
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 6px 0px rgba(0,0,0,0.12)",
      }}
    >
      {children}
    </Box>
  );
};

export default InnerPaper;