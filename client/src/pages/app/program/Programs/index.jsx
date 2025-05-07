import React, { useState } from "react";
import { Box } from "@mui/material";
import { usePrograms } from "@hooks/usePrograms";
import ProgramSelector from "./ProgramSelector";
import ProgramTile from "./ProgramTile";
import { startTransition } from "react";

const Programs = ({ colors, navigate, isMobile }) => {
  const {programs} = usePrograms();
  const [selectedProgramId, setSelectedProgramId] = useState(undefined);

  const handleSelect = (id) => {
    startTransition(() => setSelectedProgramId(id));
  };

  const selectedProgram = programs.find(p => p.id === selectedProgramId);

  return (
    <Box>
      <Box mx={isMobile && 3}>
        <ProgramSelector
          size="small"
          programs={programs}
          activeId={selectedProgramId}
          onSelect={handleSelect}
          />
      </Box>
      {selectedProgram && (
        <ProgramTile
        key={selectedProgram.id}
          id={selectedProgram.id}
          colors={colors}
          navigate={navigate}
        />
      )}
    </Box>
  );
};

export default Programs;
