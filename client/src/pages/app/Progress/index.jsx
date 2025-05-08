import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, Typography, Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import ExerciseList from "./ExerciseList";
import SingleExercise from "./SingleExercise";


const pages = ["Dashboard", "Profile", "Settings"];
const MotionBox = motion(Box);

const transition = { duration: 0.4 };

const Progress = () => {
  const [selected, setSelected] = useState(null);

  return (
    <Box
      position="relative"
      width="100%"
      height="400px"
      overflow="scroll"
    >
      <AnimatePresence mode="wait">
        {!selected ? (
          <MotionBox
            key="menu"
            initial={{ x: "-10%", opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-10%", opacity: 0 }}
            transition={transition}
            width="100%"
            top={0}
            left={0}
            p={4}
          >
            <ExerciseList setSelected={setSelected} />
          </MotionBox>
        ) : (
          <MotionBox
            key={selected}
            initial={{ x: "10%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "10%", opacity: 0 }}
            transition={transition}
            position="absolute"
            width="100%"
            height="100%"
            top={0}
            left={0}
            p={4}
          >
<SingleExercise selected={selected} setSelected={setSelected} />
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Progress;
