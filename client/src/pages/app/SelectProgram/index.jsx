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

  // Open Edit Program Dialog
  const handleEditProgram = (id, name, description) => {
    setProgramData({ programId: id, name, description });
    setOpenProgramDialog(true);
  };

  // Open Add Split Dialog
  const handleAddSplit = (programId) => {
    setSplitData({ id: null, programId, name: "", description: "" });
    setOpenSplitDialog(true);
  };

  // Open Edit Split Dialog
  const handleEditSplit = (id, name, description) => {
    setSplitData({ id, programId: null, name, description });
    setOpenSplitDialog(true);
  };

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

  // Handle Save Split (Create or Update)
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

  // Handle Delete Program
  const handleDeleteProgram = (id) => {
    deleteProgram({ programId: id });
  };

  const handleActivateProgram = (id) => {
    activateProgram({ programId: id });
  };

  // Handle Delete Split
  const handleDeleteSplit = (id, programId) => {
    deleteSplit({ splitId: id, programId });
  };

  return (
    <>
      <Box display="flex" flexWrap="wrap" gap={3}>
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
        <Button label={"Create New Program"} to={"/programs"} />
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

      {/* Add/Edit Split Dialog */}
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
    </>
  );
};

export default Programs;
