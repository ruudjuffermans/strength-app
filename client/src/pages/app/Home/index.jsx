import {
  Box,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useProgram } from "@hooks/useProgram";
import { useWorkouts } from "@hooks/useWorkouts";
import ProgramTile from "./ProgramTile";
import ContentPaper from "../../../components/papers/ContentPaper";
import InnerPaper from "../../../components/papers/InnerPaper";

const splits = [
  {
    txId: "TX1001",
    user: "Alice Johnson",
    date: "2025-05-01",
    cost: 124.99,
  },
  {
    txId: "TX1002",
    user: "Bob Smith",
    date: "2025-05-02",
    cost: 87.50,
  },
  {
    txId: "TX1003",
    user: "Carol White",
    date: "2025-05-03",
    cost: 199.00,
  },
  {
    txId: "TX1004",
    user: "David Green",
    date: "2025-05-03",
    cost: 59.95,
  },
  {
    txId: "TX1005",
    user: "Eva Brown",
    date: "2025-05-04",
    cost: 75.00,
  },
  {
    txId: "TX1006",
    user: "Frank Miller",
    date: "2025-05-04",
    cost: 32.25,
  },
  {
    txId: "TX1007",
    user: "Grace Lee",
    date: "2025-05-05",
    cost: 140.00,
  },
  {
    txId: "TX1008",
    user: "Henry Adams",
    date: "2025-05-05",
    cost: 98.90,
  },
  {
    txId: "TX1009",
    user: "Isla Thomas",
    date: "2025-05-06",
    cost: 47.60,
  },
  {
    txId: "TX1010",
    user: "Jack Wilson",
    date: "2025-05-07",
    cost: 220.15,
  },
];


const Home = ({ user, navigate, isMobile, params }) => {
  const {
    program,
    createWorkout
  } = useProgram(user.active_program);
  const theme = useTheme()

  const {
    workouts,
  } = useWorkouts();

  const handleCreateWorkout = (id) => {
const res = createWorkout({splitId: id})
navigate(`/workout/${res.id}`)
  }
  return (
    <Box>
      <Typography variant="body1" m={3}>
        Active program:
      </Typography>
      <ProgramTile name={program.name} description={program.description} colors={theme.palette} splits={program.splits} handleCreateWorkout={handleCreateWorkout} />
      {/* <Typography variant="body1">
        Logged workouts: {workouts.length}
      </Typography>
      <Typography>
        Active workouts: {workouts.length}
      </Typography>
      <Paper
          sx={{
            gridColumn: "span 4",
            gridRow: "span 2",
            overflow: "hidden",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${theme.palette.grey[400]}`}
            color={theme.palette.grey[300]}
            p="15px"
          >
            <Typography variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          <Box
            sx={{
              overflow: "auto",
              height: "200px",
            }}
          >
      {splits.map((transaction, i) => (
  <Box
    key={`${transaction.txId}-${i}`}
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    borderBottom={`1px solid ${theme.palette.grey[400]}`}
    p="15px"
  >
    <Box>
      <Typography
        color={theme.palette.grey[500]}
        variant="h5"
        fontWeight="600"
      >
        {transaction.txId}
      </Typography>
      <Typography color={theme.palette.grey[100]}>
        {transaction.user}
      </Typography>
    </Box>
    <Box color={theme.palette.grey[100]}>{transaction.date}</Box>
    <Box
      backgroundColor={theme.palette.grey[500]}
      p="5px 10px"
      borderRadius="4px"
    >
      ${transaction.cost}
    </Box>
  </Box>
      ))}
      </Box>
      </Paper> */}
    </Box>
    )
};

export default Home;
