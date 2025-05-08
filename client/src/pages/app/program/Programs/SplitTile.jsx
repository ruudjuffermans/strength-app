import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import OptionsMenu from '../../../../components/OptionsMenu'
import ExerciseTile from './ExerciseTile';

import Icon from "@components/Icon";
import InnerPaper from '../../../../components/papers/InnerPaper';
import InnerHeading from '../../../../components/headings/InnerHeading';
import Button from '../../../../components/buttons/Button';
import FormModal from '../../../../components/FormModal';
import { useExercises } from '../../../../hooks/useExercises';
import { useProgramSplit } from '../../../../hooks/useProgramSplit';

const SplitTile = ({ programId, name, description, exercises, id, navigate }) => {
    const theme = useTheme()
    const { createWorkout, editSplit, deleteSplit, addExercise, editExercise, deleteExercise } = useProgramSplit(programId, id)
    const exerciseList = useExercises().exercises

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateWorkout = async (id) => {
        const response = await createWorkout({ splitId: id })
        navigate(`/workout/${response.id}`)
    };

    // const handleEditSplit = async (id) => {
    //     const response = await updateSplit({ splitId: id })
    //     console.log(response)
    //     navigate(`/workout/${response.id}`)
    // };

    const handleDeleteSplit = async (id) => {
        await deleteSplit()
    };

    const handleAddExercise = async (props) => {
        await addExercise(props)
    };

    const handleEditSplit = async (id) => {
        await deleteSplit({ splitId: id })
    };

    const options = [
        { label: "Do Workout", icon: "go", onClick: () => handleCreateWorkout(id) },
        { label: "Edit split naming", icon: "go", onClick: () => handleEditSplit(id) },
        { label: "Delete split", icon: "go", onClick: () => handleDeleteSplit(id) },
    ];

    return (
        <InnerPaper>
            <Box position={"absolute"} right={10} top={10}>
                <OptionsMenu options={options} />
            </Box>
            <InnerHeading title={name} subtitle={description} />
            {exercises.length > 0 ? (
                <Box sx={{ overflow: "hidden", mb: 3 }}>
                    <Accordion sx={{ backgroundColor: theme.palette.background[200]}}  >
                        <AccordionSummary sx={{ pl: 2, my: 0 }} expandIcon={<Icon name={"arrow"} />}>
                            <Typography color={theme.palette.grey[300]} fontWeight={300} >Exercises</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                            <Box display="flex" flexDirection="column" gap={0}>
                                {exercises.map((exercise, index) => (
                                    <ExerciseTile key={index} exercise={exercise} />
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            ) : (
                <Box>no exercises</Box>
            )}
            <Box my={4}>
                <Button outlined label={"Add Exercise"} color="primary" onClick={handleOpen} />
            </Box>
            <FormModal
                open={open}
                handleClose={handleClose}
                title="Add Exercise"
                action={handleAddExercise}
                fields={[
                    {
                        name: "exerciseId",
                        label: "Exercise Name",
                        type: "select",
                        options: exerciseList.map((exercise) => ({
                            label: exercise.name,
                            value: exercise.id,
                        })),
                    },
                    {
                        name: "sets",
                        label: "Sets",
                    },
                    {
                        name: "reps",
                        label: "Reps",
                    },
                ]}
            />
        </InnerPaper>
    )
}

export default SplitTile