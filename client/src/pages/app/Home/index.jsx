import {
  Box,
  Typography,
} from "@mui/material";
import { useProgram } from "@hooks/useProgram";
import { useWorkouts } from "@hooks/useWorkouts";
import ProgramTile from "./ProgramTile";

const Home = ({ theme, user, navigate, isMobile, params }) => {
  const {
    program,
    createWorkout
  } = useProgram(user.active_program);

  const {
    workouts,
  } = useWorkouts();

  const handleCreateWorkout = (id) => {
const res = createWorkout({splitId: id})
navigate(`/workout/${res.id}`)
  }
  return (
    <Box>
      <Typography variant="body1">
        Active program:
      </Typography>
      <ProgramTile name={program.name} description={program.description} colors={theme.palette} splits={program.splits} handleCreateWorkout={handleCreateWorkout} />
      <Typography variant="body1">
        Logged workouts: {workouts.length}
      </Typography>
      <Typography>
        Active workouts: {workouts.length}
      </Typography>

    </Box>)
};

export default Home;


// {splits.map((transaction, i) => (
//   <Box
//     key={`${transaction.txId}-${i}`}
//     display="flex"
//     justifyContent="space-between"
//     alignItems="center"
//     borderBottom={`1px solid ${colors.contrast[400]}`}
//     p="15px"
//   >
//     <Box>
//       <Typography
//         color={colors.primary[500]}
//         variant="h5"
//         fontWeight="600"
//       >
//         {transaction.txId}
//       </Typography>
//       <Typography color={colors.contrast[100]}>
//         {transaction.user}
//       </Typography>
//     </Box>
//     <Box color={colors.contrast[100]}>{transaction.date}</Box>
//     <Box
//       backgroundColor={colors.primary[500]}
//       p="5px 10px"
//       borderRadius="4px"
//     >
//       ${transaction.cost}
//     </Box>
//   </Box>
// ))}