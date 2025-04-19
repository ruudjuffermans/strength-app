import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import { useExercises } from "@hooks/useExercises";

const Exercises = ({colors, theme, user, navigate, isMobile, params}) => {
  const { exercises } = useExercises();
  const columns = [
    { field: "id", headerName: "ID", flex: 0.1 },
    { field: "name", headerName: "Exercise Name", flex: 2 },
    { field: "muscle_group", headerName: "Muscle Group", flex: 1 },
    { field: "equipment_type", headerName: "Equipment", flex: 1 },
    { field: "description", headerName: "Description", flex: 4 },
  ];

  return (
    <DataGrid
      rows={exercises}
      columns={columns}
      density="compact"
      processRowUpdateMode="client"
      rowCount={0}
    />
  );
};

export default Exercises;
