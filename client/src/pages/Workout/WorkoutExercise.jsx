import React from 'react';
import { useTheme } from '@emotion/react';
import SubHeader from '../../components/SubHeader';
import WorkoutSet from './WorkoutSet';
import { Box } from '@mui/material';

const WorkoutExercise = ({ logs, handleInputChange, inputValues, logSet }) => {
  const theme = useTheme();

  return (
    <Box>
      <SubHeader title={logs[0]?.exercise?.name} subtitle={`target reps: ${logs[0]?.target_reps} | 1RM: 20kg | TRM: 18kg`} />
      {logs
        .sort((a, b) => a.set_number - b.set_number)
        .map((log) => (
          <WorkoutSet key={log.id} log={log} inputValues={inputValues} handleInputChange={handleInputChange} logSet={logSet} />
        ))}
    </Box>
  );
};

export default WorkoutExercise;
