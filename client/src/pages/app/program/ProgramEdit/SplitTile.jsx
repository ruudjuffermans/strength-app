import React, { useState } from 'react'
import { Paper } from "@mui/material";
import {
  Box,
  Typography,
} from "@mui/material";
import { useSplit } from '@hooks/useSplit';
import OptionsMenu from '@components/OptionsMenu';
import ContentHeading from '../../../../components/headings/ContentHeading';

const SplitTile = ({ id, name, description, user, navigate }) => {

  console.log(user)
  const {
    split,
    createWorkout,
  } = useSplit(id);

  const [edit, setEdit] = useState(false)

  const handleCreateWorkout = async (splitId) => {
    const res = await createWorkout(splitId);
    navigate(`/workout/${res.id}`)

  };

  const options = [
    { label: "Edit Naming", icon: "editTitle", onClick: () => console.log },
    { label: "Edit Exercises", icon: "editList", onClick: () => setEdit(true) },
    { label: "Delete Split", icon: "delete", onClick: console.log },
    { label: "Do Workout", icon: "go", onClick: () => handleCreateWorkout({ splitId: id }) },
  ];


  return (
    <Paper sx={{
      flex: "1 1 400px",
      width: "100%",

    }}>
      <Box position={"absolute"} right={10} top={10}>
        <OptionsMenu options={options} />
      </Box>
      <ContentHeading sub={true} title={name} subtitle={description} />

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