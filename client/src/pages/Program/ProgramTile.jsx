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
        </Box>
      </Box>

      {/* Split Tiles */}

    </CustomPaper>
  );
};

export default ProgramTile;
