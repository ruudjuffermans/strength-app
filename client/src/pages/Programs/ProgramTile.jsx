import React from "react";
import CustomPaper from "@components/CustomPaper";
import { Box, Typography } from "@mui/material";
import SubHeader from "../../components/SubHeader";
import OptionsMenu from "../../components/OptionsMenu";

const handleEdit = () => {}
const handleDelete = () => {}



const ProgramTile = ({ id, name, colors, description, splits, setActive, navigate, isActive }) => {
  const options = [
    { label: "Set Active", icon: "star", onClick: () => setActive(id) },
    { label: "View Details", icon: "look", onClick: () => navigate(`/program/${id}`) },
  ];
  
  return (
    <CustomPaper sx={{
      position: "relative",
      padding: "10px",
      flex: "1 1 400px",
      cursor: "pointer",
        background: isActive && colors.base[700],
    }}
    >
      <SubHeader title={name} subtitle={description} />
      <Box position={"absolute"} right={10} top={10}>
      <OptionsMenu options={options} />
      </Box>
      <Box
        sx={{
          px: 4,
        }}
      >
        <ul style={{ paddingLeft: 10, margin: 0 }}>
          {splits.map(({ name, description, id }) => (
            <li key={id}>
              <Box p={1} sx={{ pl: 1 }}>
                <Typography variant="body1">
                  {name}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography> */}
              </Box>
            </li>
          ))}
        </ul>
      </Box>
    </CustomPaper>
  );
};

export default ProgramTile;
