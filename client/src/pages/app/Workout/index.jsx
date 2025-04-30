import { useWorkout } from "@hooks/useWorkout";
import PagePaper from "@components/papers/PagePaper";
import { useState, useEffect } from "react";
import WorkoutExercise from "./WorkoutExercise";
import { formatDate } from "@utils/formatDate";
import { Box, Chip, TextField, Typography } from "@mui/material";
import Button from "@components/buttons/Button";

const Workout = ({ colors, theme, user, navigate, isMobile, params }) => {

  useEffect(() => {
    const content = document.querySelector('.content');
    if (content) {
      content.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);


  const { workoutId } = params;
  const { workout, completeWorkout, logSet, updateLoggedSet } =
    useWorkout(workoutId);

  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    if (workout.logs) {
      const initialValues = workout.logs.reduce((acc, log) => {
        acc[log.id] = {
          weight: log.weight_used || "",
          reps: log.performed_reps || "",
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

  const handleLogSet = ({logId, performedReps, weightUsed}) => {
    console.log(logId)
    logSet({ logId, performedReps, weightUsed });
  };
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

  const isActive = workout.workout_state === "Active";

  return (
    <PagePaper title={workout.program} subtitle={workout.split}>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        my={12}
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
                backgroundColor: isActive ? colors.base[500] : "transparent",
              }}
            />
          </Box>
        )}
      </Box>
      <Box display={"flex"} gap={12} flexDirection={"column"}>
        {Object.entries(
          workout.logs?.reduce((acc, log) => {
            (acc[log.exercise_order] = acc[log.exercise_order] || []).push(log);
            return acc;
          }, {})
        ).map(([order, logs]) => (
          <WorkoutExercise key={order} logs={logs} handleInputChange={handleInputChange} inputValues={inputValues} handleLogSet={handleLogSet} />
        ))}

        {isActive &&
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
                  readOnly: !isActive,
                }}
                sx={{
                  backgroundColor: isActive ? colors.base[500] : "transparent",
                }}
              />
            </Box>
            <Button label={"Complete workout"} onClick={() => handleCompleteWorkout()}>Complete Workout</Button>
          </>
        }
      </Box>

    </PagePaper>
  );
};

export default Workout;
