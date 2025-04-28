import React, { useState } from 'react'
import BasePaper from "@components/papers/BasePaper";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CustomDropdown from "@components/DropDown";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useExercises } from "@hooks/useExercises";
import { useSplit } from '../../hooks/useSplit';
import Icon from "@components/Icon"
import Header from '@components/Header';
import TextButton from '@components/buttons/TextButton';
import Button from '@components/buttons/Button';
import IconButton from '@components/buttons/IconButton';

const SplitTileAdmin = ({ id, name, description, navigate }) => {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    split,
    addExercise,
    deleteExercise,
    editExercise,
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
      id: item.id,   
      order: index + 1    
    }));

    reorderExercises(payload);
  };
  return (
    <BasePaper sx={{
      flex: "1 1 400px",
      width: "100%",
    }}>
      <Header sub={true} title={name} subtitle={description} />


      <Box mt={1} display="flex" flexDirection="column">
        <TextButton style={{ float: "right" }} label={"Add Exercise"} onClick={() => {
          setDialogOpen(true);
          setAnchorEl(null);
        }} />
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
                      <BasePaper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{
                          display: "flex",
                          p: 0,
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconButton icon={"drag"} size={"small"} sx={{ opacity: 0.5 }} {...provided.dragHandleProps} />

                          <Box>
                            <Typography variant="body">
                              {exercise.name}{" - "}
                              {exercise.sets}{" sets - "}
                              {exercise.reps}{" reps"}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>

                          <IconButton size={"small"} icon={"delete"} sx={{ opacity: 0.5 }} onClick={() => deleteExercise({ exerciseId: exercise.id })} />
                       </Box>
                      </BasePaper>
                    )}
                  </Draggable>

                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md">
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
          <Button label={"Cancel"} onClick={() => setDialogOpen(false)} />
          <Button label={"Add Exercise"} onClick={handleAddExercise} variant="contained" color="primary" />
        </DialogActions>
      </Dialog>


    </BasePaper>
  );
};

export default SplitTileAdmin