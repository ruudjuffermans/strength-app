import { Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CustomPaper = ({ children, ...props }) => {
  const theme = useTheme();
  
  return (
    <Paper variant="outlined" {...props}>
      {children}
    </Paper>
  );
};

export default CustomPaper;