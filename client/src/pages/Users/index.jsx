import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Box, Chip } from "@mui/material";
import { DeleteOutline, CheckCircleOutline, Block } from "@mui/icons-material";
import { useUsers } from "@hooks/useUser";
import TextButton from "@components/TextButton";

const Users = ({ isAdmin, isMobile, colors }) => {
  const { users, approveUser, disableUser, deleteUser } = useUsers();

  const columns = [
    ...(!isMobile ? [{ field: "id", headerName: "ID", flex: 0.1 }] : []),
    { field: "email", headerName: "Email", flex: 2 },
    { field: "full_name", headerName: "Name", flex: 2 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Approved" ? "success" : "warning"}
          size="small"
        />
      ),
    },
    ...(isAdmin
      ? [
          {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
              <Box display="flex" gap={1}>
                {params.row.status !== "Approved" && (
                  <IconButton
                    size="small"
                    color="success"
                    onClick={() =>
                      approveUser({
                        userId: params.row.id,
                        password: "Temp123!", // Or prompt for password
                        approvedByAdminId: 1, // Replace with actual admin ID
                      })
                    }
                  >
                    <CheckCircleOutline />
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  color="warning"
                  onClick={() => disableUser({ userId: params.row.id })}
                >
                  <Block />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => deleteUser({ userId: params.row.id })}
                >
                  <DeleteOutline />
                </IconButton>
              </Box>
            ),
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
