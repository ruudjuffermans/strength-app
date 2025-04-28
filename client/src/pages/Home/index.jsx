import {
  Box,
  IconButton,
  Typography,
} from "@mui/material";

import Icon from "@components/Icon"

import StatBox from "@components/StatBox";
import ProgressCircle from "@components/ProgressCircle";
import BasePaper from "@components/papers/BasePaper";
import { usePrograms } from "../../hooks/usePrograms";
import { useWorkouts } from "../../hooks/useWorkouts";
import Button from "@components/buttons/Button";;
import { mockTransactions } from "../../data/mockData";
import ProgramTile from "./ProgramTile";

const Home = ({colors, theme, user, navigate, isMobile, params}) => {
  const {
    programs,
  } = usePrograms();

  const {
    workouts,
  } = useWorkouts();

  const activeProgram = programs.find(program => user.active_program === program.id);
  const completedWorkouts = workouts.filter(workout => workout.workout_state == 'Completed')
  const activeWorkouts = workouts.filter(workout => workout.workout_state == 'Active')



  console.log(activeProgram)
  return isMobile ?  (
  <Box>
<Box>
      active program: 
      <ProgramTile name={activeProgram.name} description={activeProgram.description} colors={colors} splits={activeProgram.splits} navigate={navigate} />

      <Box>
      logged workouts: {completedWorkouts.length}
      </Box>      
      <Box>
      active workouts: {activeWorkouts.length}
      </Box>
    </Box>
  </Box>) :  (
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >


        <BasePaper
          variant="outlined"
          sx={{
            gridColumn: "span 3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+10%"
            icon={
              <Icon name={"email"}
                sx={{ color: colors.contrast[300], fontSize: "20px" }}
              />
            }
          />
        </BasePaper>
        <BasePaper
          sx={{
            gridColumn: "span 3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <Icon
                sx={{ color: colors.contrast[300], fontSize: "20px" }}
              />
            }
          />
        </BasePaper>
        <BasePaper
          sx={{
            gridColumn: "span 3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <Icon name={"person"}
                sx={{ color: colors.contrast[300], fontSize: "20px" }}
              />
            }
          />
        </BasePaper>
        <BasePaper
          sx={{
            gridColumn: "span 3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <Icon />
            }
          />
        </BasePaper>

        {/* ROW 2 */}
        <BasePaper
          sx={{
            gridColumn: "span 8",
            gridRow: "span 2",
          }}
        >
          <Box
            mt="10px"
            p="0 15px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography color={colors.contrast[300]} variant="h5" fontWeight="600">
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.contrast[100]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <Icon name={"download"} />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">

          </Box>
        </BasePaper>
        <BasePaper
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
            borderBottom={`1px solid ${colors.contrast[400]}`}
            color={colors.contrast[300]}
            p="15px"
          >
            <Typography variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          <Box
            sx={{
              overflow: "auto",
              height: "100%",
            }}
          >
            {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`1px solid ${colors.contrast[400]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.primary[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.contrast[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.contrast[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={colors.primary[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.cost}
                </Box>
              </Box>
            ))}
          </Box>
        </BasePaper>

        {/* ROW 3 */}
        <BasePaper
          sx={{
            padding: "15px",
            gridColumn: "span 4",
            gridRow: "span 2",
            overflow: "auto",
          }}
        >
          <Typography color={colors.contrast[300]} variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.contrast[100]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography color={colors.contrast[200]}>Includes extra misc expenditures and costs</Typography>
          </Box>
        </BasePaper>
      </Box>
  );
};

export default Home;
