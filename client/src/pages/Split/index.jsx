import React, { useState } from "react";
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Icon from "@components/Icon";

import CustomButton from "@components/CustomButton";
import { useExercises } from "@hooks/useExercises";
import { useSplit } from "@hooks/useSplit";
import CustomDropdown from "@components/DropDown";
import CustomPaper from "@components/CustomPaper";

const Split = ({ colors, theme, user, navigate, isMobile, params }) => {
  const { splitId } = params;
  const { exercises } = useExercises();
  const {
    splitExercises,
    addExercise,
    createWorkout,
    deleteExercise,
    reorderExercises
  } = useSplit(splitId);

  const [selectedExercise, setSelectedExercise] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
    if (!splitId || !selectedExercise) return;
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
    <>
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
                {(splitExercises.exercises || []).map((exercise, index) => (
                  <Draggable key={exercise.id} draggableId={exercise.id.toString()} index={index}>
                    {(provided) => (
                      <CustomPaper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          p: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle1">{exercise.name}</Typography>
                          <Typography variant="body2">
                            Sets: {exercise.sets} • Reps: {exercise.reps} • Order: {exercise.order} • id: {exercise.id}
                          </Typography>
                        </Box>
                        <IconButton onClick={() => deleteExercise({ exerciseSplitId: exercise.id })}>
                          <Icon name={"delete"} />
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

      {/* Add Exercise Button */}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <CustomButton
          variant="outlined"
          color="primary"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          icon={Add}
          label="Add Exercise"
        />
        <Menu anchorEl={anchorEl} open={openMenu} onClose={() => setAnchorEl(null)}>
          <MenuItem
            onClick={() => {
              setDialogOpen(true);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon><Icon name={"add"} fontSize="small" /></ListItemIcon>
            <ListItemText primary="Add Exercise" />
          </MenuItem>
        </Menu>
      </Box>

      {/* Add Exercise Dialog */}
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
    </>
  );
};

export default Split;
