import React from "react";
import { Paper } from "@mui/material";

const CustomPaper = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Paper ref={ref} variant="outlined" {...props}>
      {children}
    </Paper>
  );
});

export default CustomPaper;
