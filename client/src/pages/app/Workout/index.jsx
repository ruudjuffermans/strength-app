import { useWorkout } from "@hooks/useWorkout";
import PagePaper from "@components/papers/PagePaper";
import { useState, useEffect } from "react";
import WorkoutExercise from "./WorkoutExercise";
import { formatDate } from "@utils/formatDate";
import { Box, Chip, Stack, TextField, Typography } from "@mui/material";
import Button from "@components/buttons/Button";

const Workout = ({ colors, theme, user, navigate, isMobile, params }) => {

  useEffect(() => {
    const content = document.querySelector('.content');
    if (content) {
      content.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const { workoutId } = params;
  const { workout, completeWorkout, logSet } = useWorkout(workoutId);

  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (workout?.notes !== undefined) {
      setNotes(workout.notes);
    }
  }, [workout.notes]);

  if (workout.isLoading) return <p>Loading...</p>;
  if (workout.error) return <p>Error loading workout</p>;

  const handleCompleteWorkout = () => {
    completeWorkout({ notes });
    navigate("/workouts")
  };

  const isActive = workout.workout_state === "Active";

  return (
    <PagePaper title={"workout.program"} subtitle={workout.split}>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        mb={8}
        p={isMobile&& 3}
        flex={1}>
        <Box>
          <Typography color="text.secondary" variant="body2" >
            Status:
          </Typography>
          <Chip label={workout.workout_state} />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" >
            Created At
          </Typography>
          <Typography variant="body1">{formatDate(workout.created_at)}</Typography>
        </Box>
        {!isActive && (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Completed At
            </Typography>
            <Typography variant="body1">
              {workout.completed_at ? formatDate(workout.completed_at) : "—"}
            </Typography>
          </Box>
        )}
        {!isActive && (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Notes
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={5}
              value={notes || ""}
              onChange={(e) => setNotes(e.target.value)}
              InputProps={{
                readOnly: !isActive,
              }}
              sx={{
                backgroundColor: isActive ? colors.grey[500] : "transparent",
              }}
            />
          </Box>
        )}
      </Box>
      <Box display={"flex"} gap={6} flexDirection={"column"}>
        {Object.entries(
          workout.logs?.reduce((acc, log) => {
            (acc[log.exercise_order] = acc[log.exercise_order] || []).push(log);
            return acc;
          }, {})
        ).map(([order, [{exercise, sets}]]) => (
          <WorkoutExercise key={order} sets={sets} exercise={exercise} logSet={logSet} />
        ))}

        {isActive &&
          <>
            <Stack p={3} gap={3}>
              <Typography variant="body2" color="text.secondary">
                Notes
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={5}
                value={notes || ""}
                onChange={(e) => setNotes(e.target.value)}
                InputProps={{
                  readOnly: !isActive,
                }}
                sx={{
                  backgroundColor: isActive ? colors.background[200] : "transparent",
                }}
              />
            <Button label={"Complete workout"} onClick={() => handleCompleteWorkout()}>Complete Workout</Button>
            </Stack>
          </>
        }
      </Box>

    </PagePaper>
  );
};

export default Workout;
