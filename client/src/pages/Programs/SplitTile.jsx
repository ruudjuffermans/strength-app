import React from 'react'
import CustomPaper from "@components/CustomPaper";
import { Box, IconButton } from '@mui/material';
import { Delete, Edit, Link, Looks, Loop, Watch } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SplitTile = ({ id, name, description, onDeleteSplit, onEditSplit }) => {
  const navigate = useNavigate();
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
        <Box>

        </Box>
      </Box>

      </CustomPaper>
    );
  };

export default SplitTile