import React from 'react'
import { Box, InputBase, Typography, Grid, InputAdornment, useTheme } from '@mui/material';
import IconButton from '@components/buttons/IconButton';

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
      <Box display={"flex"}>
        <Box flex={"auto"} mr={1}>
          <Typography
            fontStyle="italic"
            fontWeight={"light"}
            variant="body2"
            color={colors.contrast[200]}
          >
            sets
          </Typography>
          <Box backgroundColor={isUpdated ? colors.base[300] : colors.base[900]} borderRadius={0} alignContent={"center"} height={"40px"} flex={1}>
            <Typography
              variant="body1"
              color={colors.contrast[100]}
              sx={{ mx: 2, minWidth: 24, textAlign: 'center' }}
            >
              {inputValues[id]?.reps || 0}
            </Typography>
          </Box>
        </Box>
        <Box display={"flex"} gap={1} height={"40px"} alignSelf={"end"}>

          <IconButton
            icon="remove"
            sx={{ backgroundColor: colors.contrast[300], borderRadius: 0, height: "40px", width: "40px" }}
            disabled={isUpdated}
            onClick={() =>
              handleInputChange(
                id,
                "reps",
                Math.max(0, (Number(inputValues[id]?.reps) || 0) - 1)
              )
            }
            size="small"
          />
          <IconButton
            icon="add"
            sx={{ backgroundColor: colors.contrast[300], borderRadius: 0, height: "40px", width: "40px" }}
            disabled={isUpdated}
            onClick={() =>
              handleInputChange(
                id,
                "reps",
                (Number(inputValues[id]?.reps) || 0) + 1
              )
            }
            size="small"
          />
          <Box ml={1}>
            {submitButton}
          </Box>
        </Box>
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
      <Box display="flex" sx={{ flex: 2, height: "40px" }} backgroundColor={isUpdated ? colors.base[300] : colors.base[900]} borderRadius={0}>
        <InputBase
          type={type}
          value={value}
          disabled={isUpdated}
          onChange={onChange}
          sx={{ p: 2}}
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


const WorkoutSet = ({ log, handleLogSet, inputValues, handleInputChange }) => {
  const theme = useTheme();
  const colors = theme.palette.colors
  const isUpdated = log.updated

  const submitButton = (
    <IconButton
      sx={{ backgroundColor: isUpdated ? colors.contrast[400] : colors.contrast[200], borderRadius: 0, height: "40px", width: "40px" }}
      disabled={isUpdated}
      icon={"submit"}
      onClick={() =>
        handleLogSet({
          logId: log.id,
          performedReps: Number(inputValues[log.id]?.reps) || 0,
          weightUsed: Number(inputValues[log.id]?.weight) || 0,
        })
      }
      size="small"
   />
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