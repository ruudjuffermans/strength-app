import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import CustomButton from "@components/CustomButton";
import { PlusOneOutlined, DeleteOutline } from "@mui/icons-material";
import { useExercises } from "@hooks/useExercises";
import PagePaper from "@components/CustomPaper/Pagepaper";

const ExercisesEdit = () => {
  const { exercises, addExercise, updateExercise, deleteExercise } = useExercises();
  const [open, setOpen] = useState(false);
  const [exerciseData, setExerciseData] = useState({ name: "", description: "" });

  // Handle input change
  const handleInputChange = (event) => {
    setExerciseData({ ...exerciseData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!exerciseData.name.trim()) return alert("Exercise name is required.");
    if (!exerciseData.description.trim()) return alert("Description is required.");
    
    try {
      await addExercise(exerciseData);
      setOpen(false);
      setExerciseData({ name: "", description: "" });
    } catch (error) {
      console.error("Failed to add exercise:", error);
    }
  };

  // Process inline row update
  const processRowUpdate = async (newRow) => {
    try {
      await updateExercise(newRow);
      return newRow;
    } catch (error) {
      console.error("Row update failed:", error);
      return newRow;
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.1, editable: true },
    { field: "name", headerName: "Exercise Name", flex: 2, editable: true },
    { field: "muscle_group", headerName: "Muscle Group", flex: 1, editable: true },
    { field: "equipment_type", headerName: "Equipment", flex: 1, editable: true },
    { field: "description", headerName: "Description", flex: 4, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton
          onClick={ ()=>deleteExercise({ id: params.row.id })
          }
          type="button"
          sx={{ p: 1 }}
        >
          <DeleteOutline sx={{ color: "error.main" }} />
        </IconButton>
      ),
    },
  ];

    const PageButton = <CustomButton variant="outlined" color="primary" onClick={() => setOpen()} Icon={ PlusOneOutlined } label={"Add Exercise"} />

    return (
  <PagePaper title={"EXERCISES"} subtitle={"A list of all exercises"} PageButton={PageButton}>

      <Box m="20px 0 0 0" height="75vh">
        <DataGrid
          rows={exercises}
          columns={columns}
          density="compact"
          processRowUpdate={processRowUpdate}
          processRowUpdateMode="client"
          rowCount={0}
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Exercise</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Exercise Name"
            name="name"
            fullWidth
            value={exerciseData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={exerciseData.description}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={() => setOpen(false)} color="secondary">
            Cancel
          </CustomButton>
          <CustomButton onClick={handleSubmit} color="primary">
            Save
          </CustomButton>
        </DialogActions>
      </Dialog>
    </PagePaper>
  );
};

export default ExercisesEdit;
