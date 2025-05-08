import { Typography } from '@mui/material'
import React from 'react'
import Button from '../../../components/buttons/Button'

const SingleExercise = ({selected, setSelected}) => {
  return (
    <>
    <Typography variant="h4">{selected}</Typography>
    <Typography>This is the content of {selected}.</Typography>
    <Button outlined label={"back"} onClick={() => setSelected(null)} />
    </>
  )
}

export default SingleExercise