import { Box, Typography, Chip } from "@mui/material";
import BasePaper from "@components/papers/BasePaper";

const WorkoutTile = ({ workout, navigate }) => {
  return (
    <BasePaper sx={{ position: "relative", padding: 2, mb: 2 }} onClick={() => navigate(`/workout/${workout.id}`)}>
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="h6">{workout.split}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {workout.program}
        </Typography>

        <Box display="flex" gap={1} flexWrap="wrap" alignItems="center" mt={1}>
          <Chip
            label={workout.workout_state}
            color={workout.workout_state === "Completed" ? "success" : "warning"}
            size="small"
          />
          <Typography variant="caption" color="textSecondary">
            Created: {workout.created_at}
          </Typography>

          {workout.completed_at && (
            <Typography variant="caption" color="textSecondary">
              | Completed: {workout.completed_at}
            </Typography>
          )}
        </Box>

        {workout.notes && (
          <Typography variant="body2" mt={1}>
            {workout.notes}
          </Typography>
        )}
      </Box>
    </BasePaper>
  );
};

export default WorkoutTile;
