import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import { useWorkouts } from "@hooks/useWorkouts";
import Icon from "@components/Icon"

const Workouts = ({ navigate, isAdmin, colors, isMobile }) => {
  const { workouts, deleteWorkout } = useWorkouts();
  console.log(workouts)
  const columns = [
    ...(!isMobile ? [{ field: "id", headerName: "ID", flex: 0.1 }] : []),
    { field: "program", headerName: "Program", flex: 1 },
    { field: "split", headerName: "Split", flex: 1 },
    {
      field: "workout_state",
      headerName: "State",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Completed" ? "success" : params.value === "Draft" ? "info" : "warning"}
          size="small"
        />
      ),
    },
    { field: "created_at", headerName: "Created", flex: 1 },
    ...(!isMobile ? [{ field: "completed_at", headerName: "Completed", flex: 1 }] : []),
    ...(isAdmin ? [{
      field: "actions",
      headerName: "",
      flex: 0.1,
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
            <IconButton size={"small"} onClick={handleMenuOpen}>
              <Icon size={"small"} name={"options"}  />
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
                  <Icon name={"link"} fontSize="small" />
                </ListItemIcon>
                <ListItemText>View</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <Icon name={"delete"} fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </>
        );
},
}] : []),
  ];

  return (
    <DataGrid
      rows={workouts}
      columns={columns}
      density="compact"
      processRowUpdateMode="client"
      rowCount={0}
      onRowClick={isAdmin ? undefined : (params) => navigate(`/workout/${params.row.id}`)}
      sx={{
        // fontSize: "10px",
        p: 0,
        m: 0,
        '& .MuiDataGrid-header': {
          py: 0,
          px: 0.5,
        },
        '& .MuiIconButton-root': {
          padding: "0px",
          fontSize: "11px"
        }
      }}
    />
  );
};

export default Workouts;
