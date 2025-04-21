import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useWorkouts } from "@hooks/useWorkouts";
import { DeleteOutline, Link, MoreVert } from "@mui/icons-material";

const Workouts = ({ colors, theme, user, navigate, params }) => {
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
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);

        const handleMenuOpen = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
          setAnchorEl(null);
        };

        const handleDelete = () => {
          deleteWorkout({ id: params.row.id });
          handleMenuClose();
        };

        const handleView = () => {
          navigate(`/workout/${params.row.id}`);
          handleMenuClose();
        };

        return (
          <>
            <IconButton onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleView}>
                <ListItemIcon>
                  <Link fontSize="small" />
                </ListItemIcon>
                <ListItemText>View</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <DeleteOutline fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </>
        );
      },
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
