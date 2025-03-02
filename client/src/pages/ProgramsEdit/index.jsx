import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import CustomButton from "@components/CustomButton";
import { PlusOneOutlined } from "@mui/icons-material";
import { usePrograms } from "@hooks/usePrograms";
import ProgramTile from "./ProgramTile";
import PagePaper from "../../components/CustomPaper/Pagepaper";

const ProgramsEdit = () => {
  const {
    programs,
    createProgram,
    updateProgram,
    deleteProgram,
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

  // Open Add Program Dialog
  const handleAddNewProgram = () => {
    setProgramData({ id: null, name: "", description: "" });
    setOpenProgramDialog(true);
  };

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
    if (!programData.description.trim()) return setError({...error, description: "Program description is required."});

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
  const handleSaveSplit = () => {
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

  // Handle Delete Split
  const handleDeleteSplit = (id, programId) => {
    deleteSplit({ splitId: id, programId });
  };

  const PageButton = (
    <CustomButton
      variant="outlined"
      color="primary"
      onClick={() => handleAddNewProgram()}
      Icon={PlusOneOutlined}
      label={"Add Program"}
    />
  );

  return (
    <PagePaper title={"PROGRAMS"} subtitle={"subtitle"} PageButton={PageButton}>
      <Box display="flex" flexWrap="wrap" gap="10px">
        {programs.map(({ id, name, description, splits }) => (
          <ProgramTile
            key={id}
            id={id}
            name={name}
            description={description}
            splits={splits}
            onEdit={handleEditProgram}
            onDelete={handleDeleteProgram}
            onAddSplit={handleAddSplit}
            onEditSplit={handleEditSplit}
            onDeleteSplit={handleDeleteSplit}
          />
        ))}
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
          <CustomButton
            onClick={() => setOpenProgramDialog(false)}
            color="secondary"
            label={"Cancel"}
          />
          <CustomButton onClick={handleSaveProgram} color="primary" label={"Save"}/>
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
          <CustomButton
            onClick={() => setOpenSplitDialog(false)}
            color="secondary"
            label={"Cancel"}
          />

          <CustomButton onClick={handleSaveSplit} color="primary" label={"Save"} />
        </DialogActions>
      </Dialog>
    </PagePaper>
  );
};

export default ProgramsEdit;
