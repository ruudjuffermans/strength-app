import {
  Box,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";

import { tokens } from "../../theme";
import { mockTransactions } from "@data/mockData";
import Header from "@components/Header";
// import BarChart from "components/BarChart";
import StatBox from "@components/StatBox";
import ProgressCircle from "@components/ProgressCircle";
import CustomPaper from "@components/CustomPaper";
import CustomButton from "@components/CustomButton";
import PagePaper from "../../components/CustomPaper/Pagepaper";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    const PageButton = <CustomButton variant="outlined" color="primary" onClick={() => handleAddNewProgram()}  label={"Downloads Reports"} />

    return (
  <PagePaper title={"DASHBOARD"} subtitle={"Welcome to your dashboard"} PageButton={PageButton}>




      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}

        <CustomPaper
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
              <EmailIcon
                sx={{ color: colors.contrast[300], fontSize: "20px" }}
              />
            }
          />
        </CustomPaper>
        <CustomPaper
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
              <PointOfSaleIcon
                sx={{ color: colors.contrast[300], fontSize: "20px" }}
              />
            }
          />
        </CustomPaper>
        <CustomPaper
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
              <PersonAddIcon
                sx={{ color: colors.contrast[300], fontSize: "20px" }}
              />
            }
          />
        </CustomPaper>
        <CustomPaper
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
              <TrafficIcon
                sx={{ color: colors.contrast[300], fontSize: "20px" }}
              />
            }
          />
        </CustomPaper>

        {/* ROW 2 */}
        <CustomPaper
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
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.primary[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">

          </Box>
        </CustomPaper>
        <CustomPaper
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
        </CustomPaper>

        {/* ROW 3 */}
        <CustomPaper
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
        </CustomPaper>
      </Box>
    </PagePaper>
  );
};

export default Home;
