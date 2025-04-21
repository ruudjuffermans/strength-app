import React from "react";
import CustomPaper from "@components/CustomPaper";
import { Box } from "@mui/material";
import SubHeader from "../../components/SubHeader";

const ProgramTile = ({ id, name, description, splits, navigate }) => {
  return (

    <CustomPaper sx={{
      padding: "10px",
      flex: "1 1 400px",
      cursor: "pointer",
      "&:hover": {
        background: "#123",
      }
    }}
      onClick={() => navigate(`/program/${id}`)}
    >
      <SubHeader title={name} subtitle={description} />
      <Box
        sx={{
          m: "10px",
        }}
      >
        {splits.map(({ name, description, id }) => (
          <Box key={id} p={2}>
            <SubHeader title={name} subtitle={description} />
          </Box>
        ))}
      </Box>
    </CustomPaper>
  );
};

export default ProgramTile;
