import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { usePrograms } from "@hooks/usePrograms";
import ProgramTile from "./ProgramTile";
import { startTransition } from "react";
import Selector from "../../../../components/Selector";
import FormModal from "../../../../components/FormModal";

const Programs = ({ user, colors, navigate, isMobile }) => {
  const { programs, addProgram } = usePrograms();
  const [selectedProgramId, setSelectedProgramId] = useState(undefined);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelect = (id) => {
    window.location.hash = `program-${id}`;
    startTransition(() => setSelectedProgramId(id));
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#program-")) {
      const id = parseInt(hash.replace("#program-", ""), 10);
      if (!isNaN(id)) {
        setSelectedProgramId(id);
      }
    }
  }, []);

  const selectedProgram = programs.find(p => p.id === selectedProgramId);

  console.log(programs)
  return (
    <Box>
      <Box mx={isMobile && 3}>
        <Selector
          size="small"
          items={programs}
          activeId={selectedProgramId}
          onSelect={handleSelect}
          action={handleOpen}
          actionLabel={"Create new Program +"}
        />
      </Box>
      {selectedProgram && (
        <ProgramTile
          activeProgram={user.active_program}
          key={selectedProgram.id}
          id={selectedProgram.id}
          colors={colors}
          navigate={navigate}
        />
      )}

      <FormModal
        open={open}
        handleClose={handleClose}
        title="Add program"
        action={addProgram}
        onSuccess={(res) => handleSelect(res.id)}
        fields={[
          { name: "name", label: "program name" },
          { name: "description", label: "program description" },
        ]}
      />
    </Box>
  );
};

export default Programs;
