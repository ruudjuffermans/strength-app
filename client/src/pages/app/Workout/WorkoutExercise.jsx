import React from 'react';
import Header from '@components/Header';
import WorkoutSet from './WorkoutSet';
import { Box } from '@mui/material';
import BasePaper from '@components/papers/BasePaper';

const WorkoutExercise = ({ logs, handleInputChange, inputValues, handleLogSet }) => {

  return (
    <BasePaper>
      <Header sub={true} title={logs[0]?.exercise?.name} subtitle={`target reps: ${logs[0]?.target_reps} | 1RM: 20kg | TRM: 18kg`} />
      {logs
        .sort((a, b) => a.set_number - b.set_number)
        .map((log) => (
          <WorkoutSet key={log.id} log={log} inputValues={inputValues} targetReps={logs[0]?.target_reps} handleInputChange={handleInputChange} handleLogSet={handleLogSet} />
        ))}
        <Box mt={2}>
        </Box>
    </BasePaper>
  );
};

export default WorkoutExercise;
