import React, { startTransition, useEffect, useState } from "react";
import {
  Box,
  colors,
} from "@mui/material";
import { useWorkouts } from "@hooks/useWorkouts";
import WorkoutTile from "./WorkoutTile";
import Selector from "../../../components/Selector";

const Workouts = ({navigate, isMobile}) => {
  const { workouts } = useWorkouts();

  const [selectedValue, setSelectedValue] = useState(undefined);

  const handleSelect = (id) => {
    if (id === undefined || id === null) {
      window.location.hash = '';
    } else {
      window.location.hash = `program-${id}`;
    }
    startTransition(() => setSelectedValue(id));
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#status-")) {
      const value = hash.replace("#status-", "");
      setSelectedValue(value);
    }
  }, []);

  const sortedWorkouts = [...workouts].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const filteredWorkouts = selectedValue
  ? sortedWorkouts.filter((w) => w.workout_state === selectedValue)
  : sortedWorkouts;

  const filterOptions = [
    { id: "Active", name: "Active", color: "warning" },
    { id: "Completed", name: "Completed", color: "primary" },
  ];

  return (
    <>
    <Box mx={isMobile && 3}>

            <Selector
          size="small"
          items={filterOptions}
          activeId={selectedValue}
          onSelect={handleSelect}
          action={()=> handleSelect(undefined)}
          actionLabel={"reset"}
          />
          </Box>
      <Box display="flex" flexDirection={"column"} gap={3}>
        {filteredWorkouts.map((workout,i) => (
          <WorkoutTile key={i} workout={workout} navigate={navigate}
          />
        ))}
      </Box>
    </>
  );
};

export default Workouts;
