import React from 'react';
import WorkoutSet from './WorkoutSet';
import ContentHeading from '../../../components/headings/ContentHeading';
import ContentPaper from '../../../components/papers/ContentPaper';
import Button from "@components/buttons/Button";
import { Stack } from '@mui/material';

const WorkoutExercise = ({ sets, exercise, logSet, exerciseOrder, handleCompleteExercise }) => {

  const targetRepsString = sets.map(({ target_reps }) => target_reps).join(" / ");

  return (
    <ContentPaper>
      <ContentHeading title={exercise?.name} subtitle={`target reps: ${targetRepsString} | 1RM: 20kg | TRM: 18kg`} />
      {sets
        .sort((a, b) => a.set_number - b.set_number)
        .map((set) => (
          <WorkoutSet key={set.id} exercise={exercise} set={set} logSet={logSet} />
        ))}
      <Stack mt={4}>
        <Button outlined color={"warning"} disabled={sets[0].locked} label={"Complete Exercise"} onClick={() => handleCompleteExercise(exerciseOrder)} />
      </Stack>
    </ContentPaper>
  );
};

export default WorkoutExercise;
