import React from "react";
import BasePaper from "@components/papers/BasePaper";
import { Box, Typography } from "@mui/material";
import Header from "@components/Header";
import IconButton from "../../components/buttons/IconButton";
import Icon from "../../components/Icon";


const ProgramTile = ({ id, name, colors, description, splits, navigate, setActive, isActive }) => {

  return (
    <BasePaper sx={{
      position: "relative",
      background: isActive && colors.primary[100],
    }}
    >
      <Header sub={true} title={name} subtitle={description} />
      <Box position={"absolute"} right={10} top={10}>
        <IconButton icon={isActive ? "radioOn" : "radioOff"} onClick={() =>setActive(id)}  />
      </Box>
      <Box position={"absolute"} right={10} bottom={10}>
        <IconButton icon={"info"} onClick={() =>navigate(`/program/${id}`)} />
      </Box>
      <Box px={4}>
        <ul style={{ paddingLeft: 10, margin: 0 }}>
          {splits.map(({ name, description, id }) => (
            <li key={id}>
              <Box sx={{ pl: 1 }}>
                <Typography variant="body1" fontWeight={300}>
                  {name}
                </Typography>
              </Box>
            </li>
          ))}
        </ul>
      </Box>
    </BasePaper>
  );
};

export default ProgramTile;
