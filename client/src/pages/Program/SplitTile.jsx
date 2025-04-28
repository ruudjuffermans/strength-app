import React from 'react'
import BasePaper from "@components/papers/BasePaper";
import {
  Box,
  Typography,
} from "@mui/material";
import { useSplit } from '@hooks/useSplit';
import Header from '@components/Header';
import OptionsMenu from '@components/OptionsMenu';

const SplitTile = ({ id, name, description, user, navigate }) => {
  const { split, createWorkout } = useSplit(id);
  const handleCreateWorkout = async (splitId) => {
    const res = await createWorkout(splitId);
    navigate(`/workout/${res.id}`)
  };

  const options = [
    { label: "Do Workout", icon: "go", onClick: () => handleCreateWorkout({ splitId: id }) },
  ];

  return (
    <BasePaper sx={{
      flex: "1 1 400px",
      width: "100%",

    }}>
      <Box position={"absolute"} right={10} top={10}>
        <OptionsMenu options={options} />
      </Box>
      <Header sub={true} title={name} subtitle={description} />
      <Box mt={3} display="flex" flexDirection="column" gap={1}>
        {(split.exercises || []).map((exercise, index) => (
          <BasePaper
            key={index}
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Box>
                <Typography variant="body">
                  {exercise.name}{" - "}
                  {exercise.sets}{" sets - "}
                  {exercise.reps}{" reps"}
                </Typography>
              </Box>
            </Box>
          </BasePaper>
        ))}
      </Box>
    </BasePaper>
  );
};

export default SplitTile