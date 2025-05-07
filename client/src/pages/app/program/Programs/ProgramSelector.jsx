import React from "react";
import { Box, Chip } from "@mui/material";

const ProgramSelector = ({ programs, activeId, onSelect, size="medium" }) => {
  return (
    <Box display="flex" gap={2} flexWrap="wrap" mb={4}>
      {programs.map(program => (
        <Chip
          key={program.id}
          label={program.name}
          size={size}
          sx={size=== "small" ? {py: 4, px: 2, borderRadius: 4, fontSize: "14px", fontWeight: 300}: {py: 6, px: 4, borderRadius: 6, fontSize: "14px"}}
          color={program.id === activeId ? "primary" : "default"}
          variant={program.id === activeId ? "filled" : "outlined"}
          onClick={() => onSelect(program.id)}
          clickable
        />
      ))}
    </Box>
  );
};

export default ProgramSelector;
