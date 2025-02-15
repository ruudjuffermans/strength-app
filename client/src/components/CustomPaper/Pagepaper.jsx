import CustomPaper from '@components/CustomPaper';
import Header from '@components/Header';
import CustomButton from '@components/CustomButton';

import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const PagePaper = ({ children, title, subtitle, PageButton }) => {
  const theme = useTheme();
  
  return (
    <Box m="20px">
      <CustomPaper sx={{ padding: "20px" }}>
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