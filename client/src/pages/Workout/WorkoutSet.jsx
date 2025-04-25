import React from 'react'
import { Box, InputBase, Typography, Grid, IconButton, InputAdornment, useTheme } from '@mui/material';
import CustomButton from '../../components/CustomButton';
import CustomIconButton from '../../components/IconButton';
import Icon from '../../components/Icon';

const FieldRow = ({ children }) => (
  <Box display="flex" gap={1} alignItems="center" flexWrap="wrap" position={"relative"}>
    {children}
  </Box>
);

const RepsInput = ({ handleInputChange, inputValues, id, isUpdated, submitButton }) => {
  const theme = useTheme();
  const colors = theme.palette.colors

  return (
    <>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Typography
          fontStyle="italic"
          fontWeight={"light"}
          variant="body2"
          color={colors.contrast[200]}
        >
          sets
        </Typography>
      </Box>
      <Box display={"flex"} gap={1} height={"40px"}>
        <CustomIconButton
          sx={{ backgroundColor: colors.contrast[300], borderRadius: 1, height: "40px", width: "40px" }}
          disabled={isUpdated}
          onClick={() =>
            handleInputChange(
              id,
              "reps",
              Math.max(0, (Number(inputValues[id]?.reps) || 0) - 1)
            )
          }
          size="small"
        >
          -
        </CustomIconButton>
        <CustomIconButton
          sx={{ backgroundColor: colors.contrast[300], borderRadius: 1, height: "40px", width: "40px" }}
          disabled={isUpdated}
          onClick={() =>
            handleInputChange(
              id,
              "reps",
              (Number(inputValues[id]?.reps) || 0) + 1
            )
          }
          size="small"
        >
          +
        </CustomIconButton>
        <Box backgroundColor={isUpdated ? colors.base[300] : colors.base[900]} borderRadius={1} alignContent={"center"} flex={1}>
          <Typography
            variant="body1"
            color={colors.contrast[100]}
            sx={{ mx: 2, minWidth: 24, textAlign: 'center' }}
          >
            {inputValues[id]?.reps || 0}
          </Typography>
        </Box>
          {submitButton}
      </Box>
    </>
  )
}

const WeightInput = ({ value, onChange, type = "number", setNumber, isUpdated }) => {
  const theme = useTheme();
  const colors = theme.palette.colors

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography
          variant="body2"
          color={colors.contrast[100]}
        >
          set #{setNumber}
        </Typography>

        <Typography
          variant="body2"
          fontWeight={"light"}
          color={colors.contrast[200]}
        >
          weight
        </Typography>
      </Box>
      <Box display="flex" sx={{ flex: 2, height: "40px" }} backgroundColor={isUpdated ? colors.base[300] : colors.base[900]} borderRadius={1}>
        <InputBase
          type={type}
          value={value}
          disabled={isUpdated}
          onChange={onChange}
          sx={{ p: 2 }}
          endAdornment={
            <InputAdornment position="end">
              <Typography
                variant="body2"
                color={colors.contrast[200]}
                sx={{ ml: 1 }}
                fontWeight={"light"}
              >
                kg
              </Typography>
            </InputAdornment>
          }
        />
      </Box>
    </>
  );
};


const WorkoutSet = ({ log, logSet, inputValues, handleInputChange }) => {
  const theme = useTheme();
  const colors = theme.palette.colors

  const isUpdated = log.updated

  const submitButton = (
    <CustomIconButton
      sx={{ backgroundColor: colors.contrast[300], borderRadius: 1, height: "40px", width: "40px" }}
      disabled={isUpdated}
      onClick={() =>
        logSet({
          logId: log.id,
          performedReps: Number(inputValues[log.id]?.reps) || 0,
          weightUsed: Number(inputValues[log.id]?.weight) || 0,
        })
      }
      size="small"
    >
      <Icon name={"submit"} />
    </CustomIconButton>
  )

  return (
    <Box key={log.id} sx={{ mt: 3, mx: 0 }}>
      <FieldRow>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <WeightInput
              value={inputValues[log.id]?.weight || ""}
              setNumber={log.set_number}
              isUpdated={isUpdated}
              onChange={(e) =>
                handleInputChange(log.id, "weight", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={6}>
            <RepsInput handleInputChange={handleInputChange} inputValues={inputValues} id={log.id} isUpdated={isUpdated} submitButton={submitButton} />
          </Grid>

        </Grid>
      </FieldRow>
    </Box>
  )
}

export default WorkoutSet