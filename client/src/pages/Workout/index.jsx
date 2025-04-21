import { useWorkout } from "@hooks/useWorkout";

import { useState, useEffect } from "react";
import WorkoutItem from "./WorkoutItem";

const Workout = ({colors, theme, user, navigate, isMobile, params}) => {
  const { workoutId } = params;
  console.log(workoutId)
  const { workout, completeWorkout, logSet, updateLoggedSet } =
    useWorkout(workoutId);

  const [inputValues, setInputValues] = useState({});

  // Populate input values when workout data is available
  useEffect(() => {
    if (workout.logs) {
      const initialValues = workout.logs.reduce((acc, log) => {
        acc[log.id] = {
          weight: log.weight_used || "", // Use existing value or empty string
          reps: log.performed_reps || "", // Use existing value or empty string
        };
        return acc;
      }, {});
      setInputValues(initialValues);
    }
  }, [workout.logs]);

  if (workout.isLoading) return <p>Loading...</p>;
  if (workout.error) return <p>Error loading workout</p>;

  // Handle input change
  const handleInputChange = (logId, field, value) => {
    setInputValues((prev) => ({
      ...prev,
      [logId]: {
        ...prev[logId],
        [field]: value,
      },
    }));
  };

  const handleCompleteWorkout = () => {
    completeWorkout();
    navigate("/workouts")
  };

  return (
    <>
      <div>state: {workout.workout_state}</div>
      <div>program: {workout.program}</div>
      <div>split: {workout.split}</div>
      <div>id: {workout.id}</div>
      <div>completed at: {workout.completed_at}</div>
      <div>created at: {workout.created_at}</div>
      <div>notes: {workout.notes}</div>
      <br />
      {Object.entries(
        workout.logs?.reduce((acc, log) => {
          (acc[log.exercise_order] = acc[log.exercise_order] || []).push(log);
          return acc;
        }, {})
      ).map(([order, logs]) => (
        <WorkoutItem key={order} logs={logs} handleInputChange={handleInputChange} inputValues={inputValues} logSet={logSet} />
      ))}
      <button onClick={() => handleCompleteWorkout()}>Complete Workout</button>
    </>
  );
};

export default Workout;
