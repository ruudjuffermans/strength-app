import { Box, Typography, Chip } from "@mui/material";
import ContentPaper from "../../../components/papers/ContentPaper";
import IconButton from "../../../components/buttons/IconButton";

const WorkoutTile = ({ workout, navigate }) => {
  return (
    <ContentPaper onClick={() => navigate(`/workout/${workout.id}`)}>
      <Box position={"absolute"} right={10} bottom={10}>
        <IconButton
          // sx={{ backgroundColor: set.logged ? colors.success.dark : colors.success.light, borderRadius: 2, height: "40px", width: "40px" }}
          // disabled={set.logged}
          icon={"go"}
          onClick={() => navigate(`/workout/${workout.id}`)}
          size="small"
        />
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6">{workout.split}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {workout.program}
          </Typography>
        </Box>
        <Box display={'flex'} fontWeight={300} height={0} gap={1} >
          <Chip color={workout.workout_state === "Completed" ? "success" : "warning"} label={workout.workout_state} variant="outlined" />
        </Box>
      </Box>
      <Box>
        <Box display="flex" gap={1} flexWrap="wrap" alignItems="center" mt={1}>
          <Typography variant="caption" color="textSecondary">
            Created: {workout.created_at}
          </Typography>
        </Box>

        {workout.notes && (
          <Typography variant="body2" mt={1}>
            {workout.notes}
          </Typography>
        )}
      </Box>
    </ContentPaper>
  );
};

export default WorkoutTile;
