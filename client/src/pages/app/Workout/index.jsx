import { useWorkout } from "@hooks/useWorkout";
import PagePaper from "@components/papers/PagePaper";
import { useState, useEffect } from "react";
import WorkoutExercise from "./WorkoutExercise";
import { formatDate } from "@utils/formatDate";
import { Box, Chip, Stack, TextField, Typography } from "@mui/material";
import Button from "@components/buttons/Button";
import ContentPaper from "../../../components/papers/ContentPaper";

const Workout = ({ theme, user, navigate, isMobile, params }) => {

  useEffect(() => {
    const content = document.querySelector('.content');
    if (content) {
      content.scrollTo({ top: 0 });
    }
  }, []);

  const { workoutId } = params;
  const { workout, completeWorkout, completeExercise, deleteWorkout, logSet } = useWorkout(workoutId);
console.log(workout)
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

  const handleDeleteWorkout = () => {
    deleteWorkout();
    navigate("/workouts")
  };

  const handleCompleteExercise = (id) => {
    completeExercise({exerciseOrder:id})
  };


  const isActive = workout.workout_state === "Active";

  return (
    <PagePaper title={"Workout"} subtitle={workout.split}>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        mb={4}
        p={isMobile && 3}
        flex={1}>
        <Box>
          <Chip color={workout.workout_state === "Active" ? "warning" : "success"} label={workout.workout_state} />
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
            <Typography variant="body2">
              {workout.completed_at ? formatDate(workout.completed_at) : "—"}
            </Typography>
          </Box>
        )}
      </Box>
      <Box display={"flex"} gap={6} flexDirection={"column"}>
        {Object.entries(
          workout.logs?.reduce((acc, log) => {
            (acc[log.exercise_order] = acc[log.exercise_order] || []).push(log);
            return acc;
          }, {})
        ).map(([order, [{ exercise, sets, exercise_order }]]) => (
          <WorkoutExercise key={order} sets={sets} exercise={exercise} exerciseOrder={exercise_order} logSet={logSet} handleCompleteExercise={handleCompleteExercise} />
        ))}

        <ContentPaper>
          <Stack gap={3}>
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
                backgroundColor: isActive ? theme.palette.background[200] : "transparent",
              }}
            />
            <Button label={"Complete workout"} onClick={() => handleCompleteWorkout()} />
            <Button label={"Delete workout"} outlined color={"error"} onClick={() => handleDeleteWorkout()} />
          </Stack>
        </ContentPaper>
      </Box>

    </PagePaper>
  );
};

export default Workout;
