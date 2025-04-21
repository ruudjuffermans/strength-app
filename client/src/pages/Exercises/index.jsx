import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, MenuItem, Box, Button } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useExercises } from "@hooks/useExercises";
import TextButton from "../../components/TextButton";

const muscleGroups = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];
const equipmentTypes = ["Bodyweight", "Dumbbell", "Barbell", "Machine", "Cable", "Kettlebell"];


const Exercises = ({ colors, theme, user, navigate, isMobile, isAdmin, params }) => {
  const { exercises, addExercise, updateExercise, deleteExercise } = useExercises();
  const [open, setOpen] = useState(false);
  const [exerciseData, setExerciseData] = useState({
    name: "",
    description: "",
    muscle_group: "",
    equipment_type: ""
  });
  const handleInputChange = (event) => {
    setExerciseData({ ...exerciseData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (!exerciseData.name.trim()) return alert("Exercise name is required.");
    if (!exerciseData.description.trim()) return alert("Description is required.");
    if (!exerciseData.muscle_group.trim()) return alert("Muscle group is required.");
    if (!exerciseData.equipment_type.trim()) return alert("Equipment type is required.");

    try {
      await addExercise(exerciseData);
      setOpen(false);
      setExerciseData({ name: "", description: "" });
    } catch (error) {
      console.error("Failed to add exercise:", error);
    }
  };

  const columns = [
    ...(!isMobile ? [{ field: "id", headerName: "ID", flex: 0.1 }] : []),
    { field: "name", headerName: "Exercise Name", flex: 2 },
    { field: "muscle_group", headerName: "Muscle Group", flex: 1 },
    ...(!isMobile ? [{ field: "equipment_type", headerName: "Equipment", flex: 1 }] : []),
    ...(!isMobile ? [{ field: "description", headerName: "Description", flex: 4 }] : []),
    ...(isAdmin ? [{
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton
          onClick={() => deleteExercise({ id: params.row.id })
          }
          type="button"
          size={"small"}
          sx={{ opacity: 0.5 }}
        >
          <DeleteOutline />
        </IconButton>
      ),
    }] : []),
  ];

  return (
    <>
      {isAdmin &&
        <Box mb={2} display="flex" flexDirection="column">
          <TextButton style={{ float: "right" }} text={"Add exercise"} onClick={() => setOpen(true)} />
        </Box>
      }
      <DataGrid
        rows={exercises}
        columns={columns}
        density="compact"
        paginationMode="server"
        rowCount={0}
        sx={{
          fontSize: "10px",
          p: 0,
          m: 0,
          '& .MuiDataGrid-header': {
            py: 0,
            px: 0.5,
          },
          '& .MuiIconButton-root': {
            padding: "0px",
            fontSize: "11px"
          }
        }}
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
          <TextField
            select
            margin="dense"
            label="Muscle Group"
            name="muscle_group"
            fullWidth
            value={exerciseData.muscle_group}
            onChange={handleInputChange}
          >
            {muscleGroups.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            margin="dense"
            label="Equipment Type"
            name="equipment_type"
            fullWidth
            value={exerciseData.equipment_type}
            onChange={handleInputChange}
          >
            {equipmentTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Exercises;
