import React, { useState } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Icon from "@components/Icon";

import CustomButton from "@components/CustomButton";
import { useExercises } from "@hooks/useExercises";
import { useSplit } from "@hooks/useSplit";
import CustomDropdown from "@components/DropDown";
import SplitTileAdmin from "./SplitTileAdmin";
import SplitTile from "./SplitTile";
import PagePaper from "../../components/CustomPaper/Pagepaper";

const Split = ({ colors, theme, user, navigate, isMobile, params, isAdmin }) => {
  const { splitId } = params;
  const { exercises } = useExercises();
  const {
    split,
    addExercise,
  } = useSplit(splitId);

  console.log(split)

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

  return (
    <>

      <Box display="flex" flexDirection="column" gap={2}>

        <SplitTileAdmin key={splitId} id={splitId} name={split.name} description={split.description} navigate={navigate} />

      </Box>


      <Box display="flex" justifyContent="flex-end" mt={2}>

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
