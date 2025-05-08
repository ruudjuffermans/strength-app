import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { useExercises } from "@hooks/useExercises";

const ExerciseList = ({setSelected}) => {
    const { exercises } = useExercises();
  return (
    <List>
    {exercises.map((exercise) => (
      <ListItem button key={exercise.id} onClick={() => setSelected(exercise.name)}>
        <ListItemText primary={exercise.name} />
      </ListItem>
    ))}
  </List>
  )
}

export default ExerciseList