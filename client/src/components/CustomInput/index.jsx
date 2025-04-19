import { Paper, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CustomInput = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <TextField
      fullWidth
      variant="filled"
      {...props}
    />
  );
};

export default CustomInput;
