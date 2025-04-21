import React from 'react';
import CustomPaper from '../../components/CustomPaper';
import { Box, Button, TextField, InputAdornment } from '@mui/material';
import { useTheme } from '@emotion/react';
import { getColors } from '../../theme';

const WorkoutItem = ({ logs, handleInputChange, inputValues, logSet }) => {
  const theme = useTheme();
  const colors = getColors(theme.palette.mode);

  return (
    <CustomPaper sx={{ mb: 1, p: 1 }}>
      <strong>{logs[0]?.exercise?.name}</strong>

      {logs
        .sort((a, b) => a.set_number - b.set_number)
        .map((log) => (
          <Box key={log.id} sx={{ mb: 2 }}>
            <p><strong>Set #{log.set_number}</strong> – Target Reps: {log.target_reps}</p>

            <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
              <TextField
                type="number"
                label="Weight"
                variant="outlined"
                size="small"
                value={inputValues[log.id]?.weight || ""}
                onChange={(e) =>
                  handleInputChange(log.id, 'weight', e.target.value)
                }
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }}
              />

              <TextField
                type="number"
                label="Reps"
                variant="outlined"
                size="small"
                value={inputValues[log.id]?.reps || ""}
                onChange={(e) =>
                  handleInputChange(log.id, 'reps', e.target.value)
                }
                InputProps={{
                  endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                }}
              />

              <Button
                onClick={() =>
                  logSet({
                    logId: log.id,
                    performedReps: Number(inputValues[log.id]?.reps) || 0,
                    weightUsed: Number(inputValues[log.id]?.weight) || 0,
                  })
                }
                variant="contained"
                color="primary"
                size="small"
              >
                Submit
              </Button>
            </Box>
          </Box>
        ))}
    </CustomPaper>
  );
};

export default WorkoutItem;
