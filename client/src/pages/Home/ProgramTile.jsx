import React from "react";
import BasePaper from "@components/papers/BasePaper";
import { Box, Typography } from "@mui/material";
import Header from "@components/Header";
import { useSplit } from "../../hooks/useSplit";

const ProgramTile = ({ id, name, colors, description, splits, navigate }) => {

  return (
    <BasePaper sx={{
      position: "relative",
      background: colors.primary[200],
    }}
    >
      <Header sub={true} title={name} subtitle={description} />
      <Box display={"flex"} flexDirection={"column"} gap={1}>
          {splits.map(({ name, description, id }, index) => (
          <SplitTile
            key={index}
            name={name}
            description={description}
            id={id}
            colors={colors}
            navigate={navigate}
          />
          ))}
      </Box>
    </BasePaper>
  );
};

export default ProgramTile;

const SplitTile = ({id, colors, name, navigate}) => {
      const { createWorkout } = useSplit(id);
      const handleCreateWorkout = async () => {
        const res = await createWorkout({splitId: id});
        navigate(`/workout/${res.id}`)
      };
    return (
        <BasePaper
        sx={{ p: 1, background: colors.primary[300] }}
        onClick={() => handleCreateWorkout()}
      >
          <Box sx={{ pl: 1 }}>
            <Typography variant="body1" fontWeight={300}>
              {name}
            </Typography>
          </Box>
        </BasePaper>
    )
}