import React from 'react'
import CustomPaper from '../../components/CustomPaper'
import { Box, Button } from '@mui/material'
import WorkoutInput from '../../components/WoutkoutInput'
import { useTheme } from '@emotion/react'
import { tokens } from '../../theme'

const WorkoutItem = ({ logs, handleInputChange, inputValues, logSet
}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <CustomPaper sx={{ mb: 1, p: 1 }}>
            {logs[0].exercise_name}
            {logs
                .sort((a, b) => a.set_number - b.set_number) // Ensure sets are in correct order
                .map((log) => (
                    <Box sx={{ mb: 1, p: 1 }}>
                        <p>Set #{log.set_number}</p>
                        <p>Target Reps: {log.target_reps}</p>
                        <Box display="flex" gap={1}>
                            <Box
                                backgroundColor={colors.base[300]}
                                maxWidth={100}
                                borderRadius="3px"
                            >
                                <WorkoutInput
                                    type="number"
                                    sx={{ px: 1, py: 0.5 }}
                                    placeholder="Weight"
                                    value={inputValues[log.id]?.weight || ""}
                                    onChange={(e) =>
                                        handleInputChange(log.id, "weight", e.target.value)
                                    }
                                />
                            </Box>
                            <Box
                                backgroundColor={colors.base[300]}
                                maxWidth={100}
                                borderRadius="3px"
                            >
                                <WorkoutInput
                                    type="number"
                                    sx={{ px: 1, py: 0.5 }}
                                    placeholder="Reps"
                                    value={inputValues[log.id]?.reps || ""}
                                    onChange={(e) =>
                                        handleInputChange(log.id, "reps", e.target.value)
                                    }
                                />
                            </Box>
                            <Button
                                onClick={() =>
                                    logSet({
                                        logId: log.id,
                                        performedReps: Number(inputValues[log.id]?.reps) || 0,
                                        weightUsed: Number(inputValues[log.id]?.weight) || 0,
                                    })
                                }
                                type="button"
                                sx={{ p: 1 }}
                            >
                                Submit
                            </Button>
                            <Box
                                position="relative"
                                backgroundColor={colors.base[300]}
                                maxWidth={100}
                                borderRadius="3px"
                            ></Box>
                        </Box>
                    </Box>
                ))}
        </CustomPaper>
    )
}

export default WorkoutItem