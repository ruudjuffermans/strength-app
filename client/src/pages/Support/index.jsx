import { useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "@theme";
import PagePaper from "@components/CustomPaper/Pagepaper";

const Support = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <PagePaper title={"FAQ"} subtitle={"Frequently Asked Questions Page"} >
        <Accordion sx={{margin: "15px 0"}} >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.primary[500]} variant="h5">
              An Important Question
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{margin: "15px 0"}} >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.primary[500]} variant="h5">
              Another Important Question
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{margin: "15px 0"}} >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.primary[500]} variant="h5">
              Your Favorite Question
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{margin: "15px 0"}} >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.primary[500]} variant="h5">
              Some Random Question
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{margin: "15px 0"}} >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.primary[500]} variant="h5">
              The Final Question
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </PagePaper>
    );
}

export default Support