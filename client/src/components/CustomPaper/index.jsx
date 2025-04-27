import React from "react";
import { Paper } from "@mui/material";

const CustomPaper = React.forwardRef(({ children, sx, ...props }, ref) => {
  return (
    <Paper ref={ref} variant="outlined"
      sx={{
        position: "relative",
        ...(sx || {})
      }} {...props}>
      {children}
    </Paper>
  );
});

export default CustomPaper;
