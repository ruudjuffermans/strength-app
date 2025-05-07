import { Box, Chip, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'

const ExerciseTile = ({ exercise }) => {
    const theme = useTheme()
    return (
        <Box
            sx={{
                px: 3,
                py: 2,
                display: "flex",
                flexDirection: "column",
                borderTop: "1px solid grey",
            }}
        >
            <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant="subtitle2" fontWeight={400}>
                    {exercise.exercise_name}
                </Typography>
                <Box display={'flex'} fontWeight={300} height={0} gap={1} >
                    <Chip label={exercise.exercise_muscle_group} variant="outlined" />
                    <Chip label={exercise.exercise_equipment_type} variant="outlined" />
                </Box>

            </Box>

            <Box display="flex" flexWrap="wrap" gap={2}>

                <Typography variant="body2" fontWeight={300} color='grey'>
                    Sets: {exercise.sets}
                </Typography>
                <Typography variant="body2" fontWeight={300} color='grey'>
                    Reps: {exercise.reps}
                </Typography>
            </Box>
        </Box>
    )
}

export default ExerciseTile