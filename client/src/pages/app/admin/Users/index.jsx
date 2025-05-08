import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Chip, Menu, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import { useUsers } from "@hooks/useUsers";
import TextButton from "@components/buttons/TextButton";
import Icon from "@components/Icon";
import IconButton from "@components/buttons/IconButton";

const Users = ({ isAdmin, isMobile, colors, user }) => {
  const { users, approveUser, disableUser, deleteUser } = useUsers();

  const columns = [
    ...(!isMobile ? [{ field: "id", headerName: "id", flex: 0.1 }] : []),
    { field: "email", headerName: "email", flex: 2 },
    { field: "firstname", headerName: "firstname", flex: 1 },
    { field: "lastname", headerName: "lastname", flex: 1 },
    { field: "role", headerName: "admin", type: "booleam", flex: 1 },
    {
      field: "status",
      headerName: "status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Approved" ? "success" : params.value === "Rejected" ? colors.grey[300] : "warning"}
          size="small"
        />
      ),
    },
    ...(isAdmin
      ? [
        {
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
              deleteUser({ userId: params.row.id });
              handleMenuClose();
            };

            const handleDisable = () => {
              disableUser({ userId: params.row.id });
              handleMenuClose();
            };

            const handleApprove = () => {
              console.log(params)
              approveUser({ userId: params.row.id });
              handleMenuClose();
            };

            return (
              <>
                <IconButton size={"small"} icon={"options"} onClick={handleMenuOpen} />
                <Menu

                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={handleApprove}>
                    <ListItemIcon>
                    <Icon name={"approve"} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Approve User</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleDisable}>
                  <ListItemIcon>
                    <Icon name={"disable"} fontSize="small" />
                  </ListItemIcon>
                    <ListItemText>Disable User</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleDelete}>
                  <ListItemIcon>
                    <Icon name={"delete"} fontSize="small" />
                  </ListItemIcon>
                    <ListItemText>Delete User</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            );
          },
        },
      ]
      : []),
  ];

  return (
    <>
      <Box mb={2} display="flex" flexDirection="column">
        {isAdmin && (
          <TextButton
            style={{ float: "right" }}
            text="Add User"
            onClick={() => alert("Show create user dialog here")}
          />
        )}
      </Box>
      <DataGrid
        rows={users}
        columns={columns}
        density="compact"
        autoHeight
        getRowId={(row) => row.id}
        sx={{
          fontSize: "12px",
          p: 0,
          m: 0,
          "& .MuiDataGrid-header": {
            py: 0,
            px: 0.5,
          },
          "& .MuiIconButton-root": {
            padding: "0px",
            fontSize: "11px",
          },
        }}
      />
    </>
  );
};

export default Users;
