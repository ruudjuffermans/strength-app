import { InputBase } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const WorkoutInput = ({ type, sx, value, onChange, ...props }) => {
  const theme = useTheme();

  return (
    <InputBase
      type={type}
      sx={sx}
      value={value}
      onChange={onChange}
    />
  );
};

export default WorkoutInput;
