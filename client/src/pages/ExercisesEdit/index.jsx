import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import CustomButton from "@components/CustomButton";
import { DeleteOutline } from "@mui/icons-material";
import { useExercises } from "@hooks/useExercises";

const ExercisesEdit = ({colors, theme, user, navigate, isMobile, params}) => {
  const { exercises, addExercise, updateExercise, deleteExercise } = useExercises();
  const [open, setOpen] = useState(false);
  const [exerciseData, setExerciseData] = useState({ name: "", description: "" });

  const handleInputChange = (event) => {
    setExerciseData({ ...exerciseData, [event.target.name]: event.target.value });
  };

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

    return (
      <>
        <DataGrid
          rows={exercises}
          columns={columns}
          density="compact"
          processRowUpdate={processRowUpdate}
          processRowUpdateMode="client"
          rowCount={0}
        />

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
      </>
  );
};

export default ExercisesEdit;
