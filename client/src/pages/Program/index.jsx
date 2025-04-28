import React, { useState } from "react";
import {
  Box,
} from "@mui/material";
import { usePrograms } from "@hooks/usePrograms";
import Pagepaper from "@components/papers/Pagepaper";
import SplitTile from "./SplitTile";

const Program = ({ params, navigate, user, isAdmin }) => {
  const { programs } = usePrograms();
  const { programId } = params;

  const program = programs.find(program => program.id == programId);

  return (
    <Pagepaper m={2} title={program.name} subtitle={program.description}>
      <Box display="flex" flexWrap="wrap" gap="10px" >
        <Box
          display="flex" flexWrap="wrap" gap="10px"
        >
          {program.splits.map(({ name, description, id }) => (
            <SplitTile key={id} user={user} id={id} name={name} description={description} navigate={navigate} />
          ))}
        </Box>
      </Box>
    </Pagepaper>
  );
};

export default Program;
