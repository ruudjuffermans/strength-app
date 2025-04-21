import React from "react";
import CustomPaper from "@components/CustomPaper";
import SplitTile from "./SplitTile";
import { IconButton, Box } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

const ProgramTile = ({ id, name, description, splits, navigate }) => {
  return (
<CustomPaper
  sx={{
    padding: "10px",
    position: "relative",
    width: "100%",
    cursor: "pointer",
    "&:hover": {
      background: "#123",
    },
  }}
  onClick={() => navigate(`/program/${id}`)}
>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <div>{name}</div>
          <div>{description}</div>
        </Box>

        <Box>
        </Box>
      </Box>

      {/* Split Tiles */}
      <Box
        sx={{
          marginTop: "10px",
        }}
      >
        {splits.map(({ name, description, id }) => (
          <Box key={id} p={1}>
            <div>
              {name}
            </div>
            <div>
              {description}
            </div>
          </Box>
          // <SplitTile key={id} id={id} name={name} description={description} onEditSplit={onEditSplit} onDeleteSplit={onDeleteSplit} />
        ))}
      </Box>
    </CustomPaper>
  );
};

export default ProgramTile;
