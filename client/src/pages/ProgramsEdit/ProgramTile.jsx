import React, { useState } from "react";
import CustomPaper from "@components/CustomPaper";
import SplitTile from "./SplitTile";
import {
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  EditIcon,
  DeleteIcon,
  MoreIcon,
  AddIcon
} from "@icons";

const ProgramTile = ({
  id,
  name,
  description,
  splits,
  onEdit,
  onDelete,
  onAddSplit,
  onEditSplit,
  onDeleteSplit,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <CustomPaper sx={{ padding: "10px", position: "relative", width: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <div>{name}</div>
          <div>{description}</div>
        </Box>

        <IconButton onClick={handleOpenMenu}>
          <MoreIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              onAddSplit(id, name);
              handleCloseMenu();
            }}
          >
            <ListItemIcon><AddIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Add Split</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              onEdit(id, name, description);
              handleCloseMenu();
            }}
          >
            <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Edit Program</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete(id);
              handleCloseMenu();
            }}
          >
            <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Delete Program</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      {/* Split Tiles */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {splits.map(({ name, description, id }) => (
          <SplitTile
            key={id}
            id={id}
            name={name}
            description={description}
            onEditSplit={onEditSplit}
            onDeleteSplit={onDeleteSplit}
          />
        ))}
      </Box>
    </CustomPaper>
  );
};

export default ProgramTile;
