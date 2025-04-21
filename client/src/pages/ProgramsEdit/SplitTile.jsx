import React, { useState } from 'react';
import CustomPaper from "@components/CustomPaper";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  EditIcon,
  DeleteIcon,
  MoreIcon,
  LinkIcon
} from "@icons";
import { useNavigate } from 'react-router-dom';

const SplitTile = ({ id, name, description, onDeleteSplit, onEditSplit }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <CustomPaper
      sx={{
        padding: "10px",
        margin: "5px",
        flex: "1 1 200px",
        maxWidth: "500px",
        minWidth: "300px",
      }}
    >
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
              onEditSplit(id, name, description);
              handleCloseMenu();
            }}
          >
            <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => {
              onDeleteSplit(id);
              handleCloseMenu();
            }}
          >
            <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate(`/split/${id}`);
              handleCloseMenu();
            }}
          >
            <ListItemIcon><LinkIcon fontSize="small" /></ListItemIcon>
            <ListItemText>View</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </CustomPaper>
  );
};

export default SplitTile;
