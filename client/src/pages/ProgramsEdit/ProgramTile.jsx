import React from "react";
import CustomPaper from "@components/CustomPaper";
import SplitTile from "./SplitTile";
import { IconButton, Box } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

const ProgramTile = ({ id, name, description, splits, onEdit, onDelete, onAddSplit, onEditSplit, onDeleteSplit }) => {
  return (
    <CustomPaper sx={{ padding: "10px", position: "relative", width: "100%" }}>

      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
      <div>{name}</div>
      <div>{description}</div>
      </Box>

        <Box>
        <IconButton onClick={() => onAddSplit(id, name)}>
            <Add />
          </IconButton>
          <IconButton onClick={() => onEdit(id, name)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => onDelete(id)}>
            <Delete />
          </IconButton>
        </Box>
      </Box>

      {/* Split Tiles */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // ✅ Wraps items when they don't fit
          gap: "10px", // ✅ Adds spacing between split tiles
          marginTop: "10px",
        }}
      >
        {splits.map(({ name, description, id }) => (
          <SplitTile key={id} id={id} name={name} description={description} onEditSplit={onEditSplit} onDeleteSplit={onDeleteSplit} />
        ))}
      </Box>
    </CustomPaper>
  );
};

export default ProgramTile;
