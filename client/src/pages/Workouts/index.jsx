import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import PagePaper from "@components/CustomPaper/Pagepaper";

import { useWorkouts } from "@hooks/useWorkouts";
import { DeleteOutline, Link } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Workouts = () => {
  const { workouts, deleteWorkout } = useWorkouts();
  const navigate = useNavigate();

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
          onClick={ ()=>deleteWorkout({ id: params.row.id })
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
    <PagePaper title={"WORKOUTS"} subtitle={"A list of all workouts"}>
      <Box m="20px 0 0 0" height="75vh">
        <DataGrid
          rows={workouts}
          columns={columns}
          density="compact"
          processRowUpdateMode="client"
          rowCount={0}
        />
      </Box>
    </PagePaper>
  );
};

export default Workouts;
