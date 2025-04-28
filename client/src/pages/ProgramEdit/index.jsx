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
import PagePaper from "@components/papers/PagePaper";
import SplitTileAdmin from "./SplitTileAdmin";

const ProgramEdit = ({ params, navigate, user, isAdmin }) => {
  const {
    programs,
    createProgram,
    updateProgram,
    addSplit,
    editSplit,
  } = usePrograms();
  const { programId } = params;

  const program = programs.find(program => program.id == programId);

  const [openProgramDialog, setOpenProgramDialog] = useState(false);
  const [programData, setProgramData] = useState({
    id: null,
    name: "",
    description: "",
  });
  const [error, setError] = useState({ name: "", description: "" });

  const [openSplitDialog, setOpenSplitDialog] = useState(false);
  const [splitData, setSplitData] = useState({
    id: null,
    programId: null,
    name: "",
    description: ""
  });


  // Handle Input Changes
  const handleInputChange = (event) => {
    setProgramData({ ...programData, [event.target.name]: event.target.value });
  };

  const handleSplitInputChange = (event) => {
    setSplitData({ ...splitData, [event.target.name]: event.target.value });
  };

  const handleSaveProgram = () => {
    if (!programData.name.trim()) return setError({ ...error, name: "Program name is required." });
    if (!programData.description.trim()) return setError({ ...error, description: "Program description is required." });

    if (programData.id) {
      updateProgram({
        id: programData.id,
        name: programData.name,
        description: programData.description,
      });
      setOpenProgramDialog(false);
      setProgramData({ name: "", description: "" });
    } else {
      createProgram(programData);
      setOpenProgramDialog(false);
      setProgramData({ name: "", description: "" });
    }
  };

  const handleSaveSplit = ({ colors, theme, user, navigate, isMobile, params }) => {
    if (!splitData.name.trim())
      return setError({ ...error, name: "Split name is required." });

    if (splitData.id) {
      editSplit({ splitId: splitData.id, name: splitData.name, description: splitData.description });
      setOpenSplitDialog(false);
      setSplitData({ id: null, programId: null, name: "", description: "" });
    } else {
      addSplit({ programId: splitData.programId, name: splitData.name, description: splitData.description });
      setSplitData({ id: null, programId: null, name: "", description: "" });
      setOpenSplitDialog(false);
    }
  };


  return (
    <PagePaper m={2} title={program.name} subtitle={program.description}>
      <Box display="flex" flexWrap="wrap" gap="10px" >
        <Box
          display="flex" flexWrap="wrap" gap="10px"
        >
          {program.splits.map(({ name, description, id }) => (
            <SplitTileAdmin key={id} user={user} id={id} name={name} description={description} navigate={navigate} />
          ))}
        </Box>
      </Box>

      <Dialog
        open={openProgramDialog}
        onClose={() => setOpenProgramDialog(false)}
      >
        <DialogTitle>
          {programData.id ? "Edit Program" : "Add New Program"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Program Name"
            name="name"
            fullWidth
            value={programData.name}
            onChange={handleInputChange}
            error={!!error.name}
            helperText={error.name}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={programData.description}
            onChange={handleInputChange}
            error={!!error.description}
            helperText={error.description}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenProgramDialog(false)}
            color="secondary"
            label={"Cancel"}
          />
          <Button onClick={handleSaveProgram} color="primary" label={"Save"} />
        </DialogActions>
      </Dialog>

      <Dialog open={openSplitDialog} onClose={() => setOpenSplitDialog(false)}>
        <DialogTitle>
          {splitData.id ? "Edit Split" : "Add New Split"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Split Name"
            name="name"
            fullWidth
            value={splitData.name}
            onChange={handleSplitInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Split Description"
            name="description"
            fullWidth
            value={splitData.description}
            onChange={handleSplitInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenSplitDialog(false)}
            color="secondary"
            label={"Cancel"}
          />

          <Button onClick={handleSaveSplit} color="primary" label={"Save"} />
        </DialogActions>
      </Dialog>
    </PagePaper>
  );
};

export default ProgramEdit;
