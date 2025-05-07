import React, { startTransition, useState } from "react";
import { useProgram } from "../../../../hooks/useProgram";
import SplitTile from "./SplitTile";
import ContentPaper from "../../../../components/papers/ContentPaper";
import { Box, Stack } from "@mui/material";
import OptionsMenu from "../../../../components/OptionsMenu";
import ContentHeading from "../../../../components/headings/ContentHeading";
import ProgramSelector from "./ProgramSelector";

const ProgramTile = ({ id, navigate, isMobile }) => {
  const { program, createWorkout } = useProgram(id)

  const options = [
    { label: "Set Default", icon: "go", onClick: () => alert("set default") },
  ];

  return (
    <ContentPaper>
      <Box position={"absolute"} right={10} top={10}>
        <OptionsMenu options={options} />
      </Box>
      <ContentHeading title={program.name} subtitle={program.description} />
      <Stack gap={2}>
        {program.splits.map((split) =>
          <SplitTile key={split.id} id={id} name={split.name} description={split.description} exercises={split.exercises} createWorkout={createWorkout} navigate={navigate} />

        )}
      </Stack>
    </ContentPaper>
  );
};

export default ProgramTile;
