import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import { useExercises } from "@hooks/useExercises";
import PagePaper from "@components/CustomPaper/Pagepaper";

const Exercises = () => {
  const { exercises } = useExercises();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.1 },
    { field: "name", headerName: "Exercise Name", flex: 2 },
    { field: "muscle_group", headerName: "Muscle Group", flex: 1 },
    { field: "equipment_type", headerName: "Equipment", flex: 1 },
    { field: "description", headerName: "Description", flex: 4 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
    },
  ];

  return (
    <PagePaper title={"EXERCISES"} subtitle={"A list of all exercises"}>
      <Box m="20px 0 0 0" height="75vh">
        <DataGrid
          rows={exercises}
          columns={columns}
          density="compact"
          processRowUpdateMode="client"
          rowCount={0}
        />
      </Box>
    </PagePaper>
  );
};

export default Exercises;
