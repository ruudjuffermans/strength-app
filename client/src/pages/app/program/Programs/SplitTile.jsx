import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography, useTheme } from '@mui/material'
import React from 'react'
import OptionsMenu from '../../../../components/OptionsMenu'
import ExerciseTile from './ExerciseTile';

import Icon from "@components/Icon";
import InnerPaper from '../../../../components/papers/InnerPaper';
import InnerHeading from '../../../../components/headings/InnerHeading';
const SplitTile = ({ name, description, exercises, id, createWorkout, navigate }) => {
    const theme = useTheme()

    const handleCreateWorkout = async (id) => {
        const response = await createWorkout({ splitId: id })
        console.log(response)
        navigate(`/workout/${response.id}`)

    };
    const options = [
        { label: "Do Workout", icon: "go", onClick: () => handleCreateWorkout(id) },
    ];

    return (
        <InnerPaper>
            <Box position={"absolute"} right={10} top={10}>
                <OptionsMenu options={options} />
            </Box>
            <InnerHeading title={name} subtitle={description} />
            <Box sx={{ overflow: "hidden", ml: -2, mr: -2, borderRadius: 0 }}>
            <Accordion sx={{  borderRadius: "0 !important", backgroundColor: theme.palette.background[100], borderTop: "1px solid rgba(255,255,255,5%)",}}  >
        <AccordionSummary sx={{ pl:2}} expandIcon={<Icon name={"arrow"} />}>
          <Typography sx={{ fontWeight: 400, color: theme.palette.grey[500] }}>Exercises</Typography>
        </AccordionSummary>

        <AccordionDetails sx={{p:0}}>
          <Box display="flex" flexDirection="column" gap={0}>
            {exercises.map((exercise, index) => (
                <ExerciseTile key={index} exercise={exercise} />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
            </Box>
        </InnerPaper>
    )
}

export default SplitTile