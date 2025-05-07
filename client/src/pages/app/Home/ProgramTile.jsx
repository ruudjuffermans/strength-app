import React from "react";
import { Paper } from "@mui/material";
import { Box, Typography } from "@mui/material";
import ContentHeading from "../../../components/headings/ContentHeading";
import ContentPaper from "../../../components/papers/ContentPaper";

const ProgramTile = ({ id, name, colors, description, splits , handleCreateWorkout }) => {

  return (
    <ContentPaper>
      <ContentHeading title={name} subtitle={description} />
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        {splits.map(({ name, description, id }, index) => (
          <SplitTile
            key={index}
            name={name}
            description={description}
            id={id}
            colors={colors}
            handleCreateWorkout={handleCreateWorkout}
          />
        ))}
      </Box>
    </ContentPaper>
  );
};

export default ProgramTile;

const SplitTile = ({ id, colors, name, handleCreateWorkout }) => {

  return (
    <Box
      sx={{ p: 2, background: colors.background[100], borderRadius: 2 }}
      onClick={() => handleCreateWorkout(id)}
    >
      <Box sx={{ pl: 1 }}>
        <Typography variant="body1">
          {name}
        </Typography>
      </Box>
    </Box>
  )
}