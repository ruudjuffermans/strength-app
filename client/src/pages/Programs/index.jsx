import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Button from "@components/buttons/Button";
import { usePrograms } from "@hooks/usePrograms";
import ProgramTile from "./ProgramTile";

const Programs = ({ colors, navigate, user }) => {
  const {
    programs,
    createProgram,
    updateProgram,
    deleteProgram,
    activateProgram,
    addSplit,
    editSplit,
    deleteSplit,
  } = usePrograms();

  // State for Add/Edit Program Dialog
  const [openProgramDialog, setOpenProgramDialog] = useState(false);
  const [programData, setProgramData] = useState({
    id: null,
    name: "",
    description: "",
  });
  const [error, setError] = useState({ name: "", description: "" });

  // State for Add/Edit Split Dialog
  const [openSplitDialog, setOpenSplitDialog] = useState(false);
  const [splitData, setSplitData] = useState({
    id: null,
    programId: null,
    name: "",
    description: ""
  });

  const handleActivateProgram = (id) => {
    activateProgram({ programId: id });
  };

  return (
      <Box display="flex" flexDirection={"column"} gap={3}>
        {programs.map(({ id, name, description, splits }) => (
          <ProgramTile
            key={id}
            id={id}
            name={name}
            colors={colors}
            description={description}
            splits={splits}
            navigate={navigate}
            setActive={handleActivateProgram}
            isActive={user.active_program == id}
          />
        ))}
        {/* <Button label={"Create New Program"} to={"/programs"} /> */}
      </Box>
  );
};

export default Programs;
