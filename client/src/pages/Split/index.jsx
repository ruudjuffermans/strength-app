import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, FormControl, Select, MenuItem, IconButton } from "@mui/material";
import Header from "@components/Header";
import CustomPaper from "@components/CustomPaper";
import CustomButton from "@components/CustomButton";
import { PlusOneOutlined, DeleteOutline } from "@mui/icons-material";
import { useExercises } from "@hooks/useExercises";
import { useSplit } from "@hooks/useSplit";
import CustomDropdown from "../../components/DropDown";
import PagePaper from "../../components/CustomPaper/Pagepaper";

const Split = () => {
  const { splitId } = useParams();
  const { exercises } = useExercises();
  const { splitExercises, addExercise, editExercise, createWorkout, deleteExercise } = useSplit(splitId);

  const [selectedExercise, setSelectedExercise] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

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
    setReps("")
    setSets("")
    setSelectedExercise("")
  };

  const columns = [
    { field: "order", headerName: "order", flex: 0.5},
    { field: "name", headerName: "Exercise Name", flex: 2 },
    { field: "sets", headerName: "Sets", flex: 1 },
    { field: "reps", headerName: "Reps", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          onClick={() => deleteExercise({ exerciseSplitId: params.row.id })}
          type="button"
          sx={{ p: 1 }}
        >
          <DeleteOutline sx={{ color: "red" }} />
        </IconButton>
      ),
    },
  ];

    const PageButton = (
      <CustomButton
        variant="outlined"
        color="primary"
        onClick={() => createWorkout()}
        Icon={PlusOneOutlined}
        label={"Create Workout"}
      />
    );

  return (
<PagePaper title={`Split: ${splitExercises.name}`} subtitle={`description: ${splitExercises.description}`} PageButton={PageButton}>

        {/* FLEX ROW FOR DROPDOWNS */}
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          mt={2}
          sx={{ width: "100%" }}
        >
          <FormControl sx={{ flex: 3 }}>
            <Select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select an exercise
              </MenuItem>
              {exercises.map((exercise) => (
                <MenuItem key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ flex: 1, minWidth: "150px" }}>
            <CustomDropdown
              value={sets}
              onChange={setSets}
              options={setOptions}
              placeholder="Sets"
              sx={{ flexGrow: 1, minWidth: "100px" }}
            />
          </Box>
          <Box sx={{  flex: 1, minWidth: "150px" }}>
            <CustomDropdown
              value={reps}
              onChange={setReps}
              options={repOptions}
              placeholder="Reps"
            />
          </Box>
          <CustomButton
            variant="contained"
            color="primary"
            onClick={handleAddExercise}
            Icon={PlusOneOutlined}
            label={"Add Exercise"}
          />
        </Box>

        {/* TABLE */}
        <Box mt={3} height="50vh">
          <DataGrid
            rows={splitExercises.exercises || []}
            columns={columns}
            density="compact"
            processRowUpdateMode="client"
            rowCount={0}
          />
        </Box>
      </PagePaper>
  );
};

export default Split;
