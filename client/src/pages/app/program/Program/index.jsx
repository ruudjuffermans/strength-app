import React from "react";
import { Box } from "@mui/material";
import { useProgram } from "@hooks/useProgram";
import PagePaper from "@components/papers/PagePaper";
import SplitTile from "./SplitTile";

const Program = ({ params, navigate, user, isAdmin }) => {
  const { programId } = params;
  const { program } = useProgram(programId, "base");

  // const program = programs.find(program => program.id == programId);

  return (
    <PagePaper m={2} title={program.name} subtitle={program.description}>
      <Box display="flex" flexWrap="wrap" gap="10px" >
        <Box
          display="flex" flexWrap="wrap" gap="10px"
        >
          {program.splits.map(({ name, description, id }) => (
            <SplitTile key={id} user={user} id={id} name={name} description={description} navigate={navigate} />
          ))}
        </Box>
      </Box>
    </PagePaper>
  );
};

export default Program;
