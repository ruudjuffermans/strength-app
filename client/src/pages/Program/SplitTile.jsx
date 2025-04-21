import React, { useState } from 'react'
import CustomPaper from "@components/CustomPaper";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CustomDropdown from "@components/DropDown";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useExercises } from "@hooks/useExercises";
import { useNavigate } from 'react-router-dom';
import { useSplit } from '../../hooks/useSplit';
import { Add, DeleteOutline, DragIndicator, Opacity } from '@mui/icons-material';
import CustomButton from "@components/CustomButton";

const SplitTile = ({ id, name, description, onDeleteSplit, onEditSplit }) => {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    splitExercises,
    addExercise,
    createWorkout,
    deleteExercise,
    reorderExercises
  } = useSplit(id);
  const { exercises } = useExercises();
  const openMenu = Boolean(anchorEl);

  const repOptions = Array.from({ length: 15 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} reps`,
  }));
  const setOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} sets`,
  }));
  const handleAddExercise = () => {
    if (!id || !selectedExercise) return;
    addExercise({ exerciseId: selectedExercise, reps, sets });
    setReps("");
    setSets("");
    setSelectedExercise("");
    setDialogOpen(false);
    setAnchorEl(null);
  };
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(splitExercises.exercises);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    const payload = reordered.map((item, index) => ({
      id: item.id,         // this should be the splitExerciseId
      order: index + 1     // 1-based order
    }));

    reorderExercises(payload);
  };
  return (
    <CustomPaper>
    <Box
      sx={{
        padding: "10px",
        margin: "5px",
        flex: "1 1 200px",
        maxWidth: "500px",
        minWidth: "300px",
      }}
    >
      <Box display="" justifyContent="space-between" alignItems="center">
        <Box>
          <div>{name}</div>
          <div>{description}</div>

        </Box>
        <Box>

          <Box mt={3} display="flex" flexDirection="column" gap={2}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="exercise-list">
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                  >
                    <Box display="" justifyContent="flex-end" mt={2}>
                      <button
                        variant="outlined"
                        color="primary"
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        Icon={Add}
                        label="Add Exercise"
                      >add exercise</button> <div/>
                                            <button
                        variant="outlined"
                        color="primary"
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        Icon={Add}
                        label="Add Exercise"
                      >add exercise</button>
                      <Menu anchorEl={anchorEl} open={openMenu} onClose={() => setAnchorEl(null)}>
                        <MenuItem

                          onClick={() => {
                            setDialogOpen(true);
                            setAnchorEl(null);
                          }}
                        >
                          <ListItemIcon><Add fontSize="small" /></ListItemIcon>
                          <ListItemText primary="Add Exercise" />
                        </MenuItem>
                      </Menu>
                    </Box>
                    {(splitExercises.exercises || []).map((exercise, index) => (
                      <Draggable key={exercise.id} draggableId={exercise.id.toString()} index={index}>
  {(provided) => (
    <CustomPaper
      ref={provided.innerRef}
      {...provided.draggableProps} // Apply to main draggable item
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        {/* 👇 Drag handle icon */}
        <IconButton sx={{opacity: 0.5}} {...provided.dragHandleProps}>
          <DragIndicator />
        </IconButton>

        <Box>
          <Typography variant="subtitle1">{exercise.name}</Typography>
          <Typography variant="body2">
            Sets: {exercise.sets}<br/>
            Reps: {exercise.reps} 
          </Typography>
        </Box>
      </Box>

      <IconButton onClick={() => deleteExercise({ exerciseSplitId: exercise.id })}>
        <DeleteOutline />
      </IconButton>
    </CustomPaper>
  )}
</Draggable>

                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </Box>

        </Box>
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Exercise to Split</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <FormControl fullWidth>
              <Select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>Select an exercise</MenuItem>
                {exercises.map((exercise) => (
                  <MenuItem key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <CustomDropdown
              value={sets}
              onChange={setSets}
              options={setOptions}
              placeholder="Sets"
            />
            <CustomDropdown
              value={reps}
              onChange={setReps}
              options={repOptions}
              placeholder="Reps"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddExercise} variant="contained" color="primary">
            Add Exercise
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </CustomPaper>
  );
};

export default SplitTile