import React from "react";
import { Box, Chip } from "@mui/material";

const Selector = ({ items, activeId, onSelect, size="medium", action, actionLabel }) => {
  return (
    <Box display="flex" gap={2} flexWrap="wrap" mb={4}>
      {items.map(item => (
        <Chip
          key={item.id}
          label={item.name}
          size={size}
          sx={size=== "small" ? {py: 4, px: 2, borderRadius: 4, fontSize: "14px", fontWeight: 300}: {py: 6, px: 4, borderRadius: 6, fontSize: "14px"}}
          color={item.id === activeId ? item.color : "default"}
          variant={item.id === activeId ? "filled" : "outlined"}
          onClick={() => onSelect(item.id)}
          clickable
        />
      ))}
      <Chip label={actionLabel} sx={size=== "small" ? {py: 4, px: 2, borderRadius: 4, fontSize: "14px", fontWeight: 300}: {py: 6, px: 4, borderRadius: 6, fontSize: "14px"}}
           variant="outlined" onClick={action} />
    </Box>
  );
};

export default Selector;
