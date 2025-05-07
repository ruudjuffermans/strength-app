import { useTheme } from '@emotion/react';
import { Box, InputAdornment, Typography } from '@mui/material';
import React from 'react'
import IconButton from '../../../components/buttons/IconButton';

const RepsInput = ({ value, setValue, isLogged }) => {
  const theme = useTheme();
  const colors = theme.palette;

  return (
    <Box display="flex" sx={{ flex: 1, height: "40px" }}>
      <Box flex={"auto"} mr={1}>
        <Box backgroundColor={isLogged ? colors.background[300] : colors.background[200]} borderRadius={2} height={"40px"} display="flex" alignItems="center" justifyContent="center">
          <Typography
            variant="body1"
            color={colors.grey[100]}
            sx={{ minWidth: 24, textAlign: 'center' }}
          >
            {value}
          </Typography>
            <InputAdornment position="end">
              <Typography
                variant="body2"
                color={colors.grey[200]}
                sx={{ ml: 0 }}
                fontWeight={"light"}
              >
                reps
              </Typography>
            </InputAdornment>
          
        </Box>
      </Box>
      <Box display={"flex"} gap={1} height={"40px"} alignSelf={"end"}>
        <IconButton
          icon="remove"
          sx={{ backgroundColor: colors.background[400], borderRadius: 2, height: "40px", width: "40px" }}
          disabled={isLogged}
          onClick={() => setValue(prev => Math.max(0, prev - 1))}
          size="small"
        />
        <IconButton
          icon="add"
          sx={{ backgroundColor: colors.background[400], borderRadius: 2, height: "40px", width: "40px" }}
          disabled={isLogged}
          onClick={() => setValue(prev => prev + 1)}
          size="small"
        />
      </Box>
    </Box>
  );
};

export default RepsInput