import { useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Box, Typography, Container } from "@mui/material";
import Icon from "@components/Icon";

const Support = ({colors, theme, user, navigate, isMobile, params}) => {

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>

      <Container maxWidth="md" sx={{ pt: 10 }}>
      <>
        <Accordion sx={{mb: 2}}>
          <AccordionSummary expandIcon={<Icon name={"arrow"} />}>
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
        <Accordion sx={{mb: 2}} >
          <AccordionSummary expandIcon={<Icon name={"arrow"} />}>
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
        <Accordion sx={{mb: 2}} >
          <AccordionSummary expandIcon={<Icon name={"arrow"} />}>
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
        <Accordion sx={{mb: 2}} >
          <AccordionSummary expandIcon={<Icon name={"arrow"} />}>
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
        <Accordion sx={{mb: 2}} >
          <AccordionSummary expandIcon={<Icon name={"arrow"} />}>
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
      </>
      </Container>
    </Box>
  );
};


export default Support