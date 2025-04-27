import React, { useState } from 'react'
import CustomPaper from "@components/CustomPaper";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CustomDropdown from "@components/DropDown";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useExercises } from "@hooks/useExercises";
import { useSplit } from '../../hooks/useSplit';
import Icon from "@components/Icon"
import SubHeader from '@components/SubHeader';
import CustomButton from '../../components/CustomButton';

const SplitTileAdmin = ({ id, name, description, onDeleteSplit, onEditSplit, navigate }) => {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    split,
    addExercise,
    deleteExercise,
    reorderExercises
  } = useSplit(id);
  const { exercises } = useExercises();

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

  const handleDeleteExercise = (id) => {
    console.log(id)
    deleteExercise({exerciseId: id})
  };

  const handleEditExercise = () => {
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

    const reordered = Array.from(split.exercises);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    const payload = reordered.map((item, index) => ({
      id: item.id,         // this should be the splitExerciseId
      order: index + 1     // 1-based order
    }));

    reorderExercises(payload);
  };
  return (
    <CustomPaper sx={{
      padding: "10px",
      flex: "1 1 400px",
      width: "100%",
    }}>
      <SubHeader title={name} subtitle={description} />
      <Box mt={1} display="flex" flexDirection="column">
        <Box >
          <CustomButton label={"Add Exercise"} onClick={() => {
            setDialogOpen(true);
            setAnchorEl(null);
          }} />
        </Box>
      </Box>
      <Box mt={3} display="flex" flexDirection="column" gap={1}>
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
                {(split.exercises || []).map((exercise, index) => (
                  <Draggable key={exercise.id} draggableId={exercise.id.toString()} index={index}>
                    {(provided) => (
                      <CustomPaper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{
                          p: 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconButton size={"small"} sx={{ opacity: 0.5 }} {...provided.dragHandleProps}>
                            <Icon name={"drag"} />
                          </IconButton>

                          <Box>
                            <Typography variant="subtitle1">{exercise.name}</Typography>
                            <Typography variant="body2" color={"grey"}>
                              Sets: {exercise.sets} -
                              Reps: {exercise.reps}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>

                          <IconButton size={"small"} sx={{ opacity: 0.5 }} onClick={() => handleEditExercise(exercise.id)}>
                            <Icon size={"small"} name={"edit"} />
                          </IconButton>
                          <IconButton size={"small"} sx={{ opacity: 0.5 }} onClick={() => handleDeleteExercise(exercise.id)}>
                            <Icon size={"small"} name={"delete"} />
                          </IconButton>
                        </Box>
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
    </CustomPaper>
  );
};

export default SplitTileAdmin