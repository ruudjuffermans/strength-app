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
          sx={{ backgroundColor: set.logged || set.locked ? `${colors.warning.light} !important` : `${colors.warning.main} !important`, borderRadius: 2, opacity: set.logged || set.locked ? "0.8 !important": 1, height: "40px", width: "40px" }}
          disabled={set.logged || set.locked}
          icon={set.logged || set.locked ? "lock" : "lockOpen"}
          onClick={() => handleLogSet({ logId: set.id })}
          size="small"
        />

      </FieldRow>
    </Box>
  );
};

export default WorkoutSet;
