import React from 'react';
import CustomPaper from '../../components/CustomPaper';
import { Box, InputAdornment, InputBase, ButtonBase, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { getColors } from '../../theme';
import SubHeader from '../../components/SubHeader';

const FieldRow = ({ children }) => (
  <Box display="flex" gap={1} alignItems="center" flexWrap="wrap" maxWidth={"500px"} position={"relative"}>
    {children}
  </Box>
);

const FieldInput = ({ value, onChange, type = "number" }) => {
  const theme = useTheme();
  const colors = getColors(theme.palette.mode);

  return (
    <Box display="flex" sx={{ flex: 2, height: "40px" }} backgroundColor={colors.base[500]} borderRadius="3px">
      <InputBase
        type={type}
        value={value}
        onChange={onChange}
        sx={{ p: 2 }}
      />
    </Box>
  );
};

const FieldButton = ({ onClick, children }) => {
  const theme = useTheme();
  const colors = getColors(theme.palette.mode);
  return (

    <ButtonBase onClick={onClick} sx={{ borderRadius: "3px", backgroundColor: colors.contrast[200], color: colors.base[100], flex: "1", height: "40px", display: "flex" }}>
    {children}
  </ButtonBase>
  )
};

const WorkoutItem = ({ logs, isMobile, handleInputChange, inputValues, logSet }) => {
  const theme = useTheme();
  const colors = getColors(theme.palette.mode);

  return (
    <CustomPaper sx={{ mb: 1, p: 1 }}>
      <SubHeader title={logs[0]?.exercise?.name} subtitle={`target reps: ${logs[0]?.target_reps} | 1RM: 20kg | TRM: 18kg`} />
      {logs
        .sort((a, b) => a.set_number - b.set_number)
        .map((log) => (
          <Box key={log.id}  sx={{ mt: 3, mx: 2 }}>
            <Typography fontSize={isMobile ? "14px" : "16px"} fontWeight={'bold'} lineHeight={0} color={colors.contrast[100]}>set #{log.set_number}</Typography>
            <FieldRow>
              <Box flex={2} justifyItems={"right"}>
                <Typography float="right" fontSize={isMobile ? "11px" : "13px"} fontStyle={'italic'} variant="h5" color={colors.contrast[200]}>
                weight
              </Typography>
              </Box>
              <Box flex={2} justifyItems={"right"}>
                <Typography fontSize={isMobile ? "11px" : "13px"} fontStyle={'italic'} variant="h5" color={colors.contrast[200]}>
                reps
              </Typography>
              </Box>
              <Box flex={1}/>
            </FieldRow>
            <FieldRow>
              <FieldInput
                value={inputValues[log.id]?.weight || ""}
                onChange={(e) =>
                  handleInputChange(log.id, 'weight', e.target.value)
                }
              />
              <FieldInput
                value={inputValues[log.id]?.reps || ""}
                onChange={(e) =>
                  handleInputChange(log.id, 'reps', e.target.value)
                }
              />
              <FieldButton
                onClick={() =>
                  logSet({
                    logId: log.id,
                    performedReps: Number(inputValues[log.id]?.reps) || 0,
                    weightUsed: Number(inputValues[log.id]?.weight) || 0,
                  })
                }
              >
                Submit
              </FieldButton>
            </FieldRow>
          </Box>
        ))}
    </CustomPaper>
  );
};

export default WorkoutItem;
