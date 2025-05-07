import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import IconButton from '@components/buttons/IconButton';
import RepsInput from './RepsInput';
import WeightInput from './WeighInput';

const FieldRow = ({ children }) => (
  <Box display="flex" gap={1} alignItems="center" flexWrap="wrap" position={"relative"}>
    {children}
  </Box>
);



const WorkoutSet = ({ set, exercise, logSet }) => {
  const theme = useTheme();
  const colors = theme.palette;

  console.log(set)

  const [weight, setWeight] = useState(set.weight_used ?? "");
  const [reps, setReps] = useState(set.performed_reps ?? "");

  const handleLogSet = ({ logId }) => {
    logSet({
      logId,
      performedReps: reps,
      weightUsed: weight,
    });
  };
  return (
    <Box key={set.id} sx={{ mt: 1, mx: 0 }}>
      <FieldRow>
        <WeightInput
          value={weight}
          isLogged={set.logged}
          isLocked={set.locked}
          onChange={(e) => setWeight(e.target.value)}
        />
        <RepsInput
          value={reps}
          targetReps={set.target_reps}
          setValue={setReps}
          isLogged={set.logged}
          isLocked={set.locked}
        />
        <IconButton
          sx={{ backgroundColor: set.logged ? colors.primary.dark : colors.primary.light, borderRadius: 2, height: "40px", width: "40px" }}
          disabled={set.logged}
          icon={set.logged ? "lock" : "submit"}
          onClick={() => handleLogSet({ logId: set.id })}
          size="small"
        />

      </FieldRow>
    </Box>
  );
};

export default WorkoutSet;
