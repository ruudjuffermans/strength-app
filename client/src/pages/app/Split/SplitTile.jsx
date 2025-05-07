import React from 'react'
import { Paper } from "@mui/material";
import {
  Box,
  Typography,
} from "@mui/material";
import { useSplit } from '@hooks/useSplit';
import TextButton from '@components/TextButton';
import ContentHeading from '../../../components/headings/ContentHeading';

const SplitTile = ({ id, name, description, navigate }) => {

  const {
    split,
    createWorkout,
  } = useSplit(id);


  const handleCreateWorkout = async (splitId) => {
    const res = await createWorkout(splitId);
    navigate(`/workout/${res.id}`)

  };

  return (
    <Paper sx={{
      flex: "1 1 400px",
      width: "100%",
    }}>
        <ContentHeading title={name} subtitle={description} />
        <Box mt={1} display="flex" flexDirection="column">
        <TextButton style={{float: "right"}} label={"Do the Workout"} onClick={() => handleCreateWorkout({ splitId: id })} />
        </Box>
          <Box mt={3} display="flex" flexDirection="column" gap={1}>
            
            {(split.exercises || []).map((exercise, index) => (
              <Paper
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
              </Paper>
            ))}
          </Box>
    </Paper>
  );
};

export default SplitTile