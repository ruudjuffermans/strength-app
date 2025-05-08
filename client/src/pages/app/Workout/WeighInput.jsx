import { useTheme } from "@emotion/react";
import { Box, InputAdornment, InputBase, Typography } from "@mui/material";

const WeightInput = ({ value, onChange, isLogged, isLocked }) => {
  const theme = useTheme();
  const colors = theme.palette;

  return (
    <Box display="flex" sx={{ flex: 1, height: "40px" }} backgroundColor={isLogged || isLocked ? colors.background[200] : colors.background[300]} borderRadius={2}>
      <InputBase
        type="number"
        value={value}
        disabled={isLogged || isLocked}
        onChange={onChange}
        sx={{ p: 2 }}
        endAdornment={
          <InputAdornment position="end">
            <Typography
              variant="body2"
              color={colors.grey[200]}
              sx={{ ml: 1 }}
              fontWeight={"light"}
            >
              kg
            </Typography>
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default WeightInput;