import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";

import { useWorkouts } from "@hooks/useWorkouts";
import { DeleteOutline, Link } from "@mui/icons-material";

const Workouts = ({colors, theme, user, navigate, isMobile, params}) => {
  const { workouts, deleteWorkout } = useWorkouts();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.1 },
    { field: "program", headerName: "Program", flex: 1 },
    { field: "split", headerName: "Split", flex: 1 },
    { field: "workout_state", headerName: "State", flex: 1 },
    { field: "created_at", headerName: "Created", flex: 1 },
    { field: "completed_at", headerName: "Completed", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => deleteWorkout({ id: params.row.id })
            }
            type="button"
            sx={{ p: 1 }}
          >
            <DeleteOutline sx={{ color: "error.main" }} />
          </IconButton>
          <IconButton onClick={() => navigate(`/workout/${params.row.id}`)}>
            <Link
            />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <DataGrid
      rows={workouts}
      columns={columns}
      density="compact"
      processRowUpdateMode="client"
      rowCount={0}
    />
  );
};

export default Workouts;
