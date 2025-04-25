import { useWorkout } from "@hooks/useWorkout";
import PagePaper from "@components/CustomPaper/Pagepaper";
import { useState, useEffect } from "react";
import WorkoutExercise from "./WorkoutExercise";
import { formatDate } from "../../utils/formatDate";
import Bubble from "../../components/Bubble";
import { Box, TextField, Typography } from "@mui/material";
import CustomButton from "../../components/CustomButton";

const Workout = ({ colors, theme, user, navigate, isMobile, params }) => {
  const { workoutId } = params;
  const { workout, completeWorkout, logSet, updateLoggedSet } =
    useWorkout(workoutId);

  const [inputValues, setInputValues] = useState({});

  // Populate input values when workout data is available
  useEffect(() => {
    if (workout.logs) {
      const initialValues = workout.logs.reduce((acc, log) => {
        acc[log.id] = {
          weight: log.weight_used || "", // Use existing value or empty string
          reps: log.performed_reps || "", // Use existing value or empty string
        };
        return acc;
      }, {});
      setInputValues(initialValues);
    }
  }, [workout.logs]);

  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (workout?.notes !== undefined) {
      setNotes(workout.notes);
    }
  }, [workout.notes]);

  if (workout.isLoading) return <p>Loading...</p>;
  if (workout.error) return <p>Error loading workout</p>;

  // Handle input change
  const handleInputChange = (logId, field, value) => {
    setInputValues((prev) => ({
      ...prev,
      [logId]: {
        ...prev[logId],
        [field]: value,
      },
    }));
  };

  const handleCompleteWorkout = () => {
    completeWorkout({ notes });
    navigate("/workouts")
  };

  const isDraft = workout.workout_state === "Draft";

  return (
    <PagePaper title={workout.program} subtitle={workout.split}>
      <Box
        display="flex"
        flexDirection="row"
        pb={6}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={4}
          my={4}
          flex={1}>
          <Box>
            <Typography color="text.secondary" variant="body2" >
              Status:
            </Typography>
            <Box>
              <Bubble label={workout.workout_state} />
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary" >
              Created At
            </Typography>
            <Typography variant="body1">{formatDate(workout.created_at)}</Typography>
          </Box>
          {!isDraft &&
          <Box>
            <Typography variant="body2" color="text.secondary">
              Completed At
            </Typography>
            <Typography variant="body1">
              {workout.completed_at ? formatDate(workout.completed_at) : "—"}
            </Typography>
          </Box>
}
          {!isDraft &&
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
                  readOnly: !isDraft,
                }}
                sx={{
                  backgroundColor: isDraft ? colors.base[500] : "transparent",
                }}
              />
            </Box>
          }
        </Box>
      </Box>
      <Box display={"flex"} gap={12} flexDirection={"column"}>
        {Object.entries(
          workout.logs?.reduce((acc, log) => {
            (acc[log.exercise_order] = acc[log.exercise_order] || []).push(log);
            return acc;
          }, {})
        ).map(([order, logs]) => (
          <WorkoutExercise key={order} logs={logs} handleInputChange={handleInputChange} inputValues={inputValues} logSet={logSet} />
        ))}

        {isDraft &&
          <>
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
                  readOnly: !isDraft,
                }}
                sx={{
                  backgroundColor: isDraft ? colors.base[500] : "transparent",
                }}
              />
            </Box>
            <CustomButton label={"Complete workout"} onClick={() => handleCompleteWorkout()}>Complete Workout</CustomButton>
          </>
        }
      </Box>
    </PagePaper>
  );
};

export default Workout;
