import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useExercises } from "@hooks/useExercises";
import OptionsMenu from "@components/OptionsMenu";
import Button from "@components/buttons/Button";
import FormModal from "../../../components/FormModal";

const MUSCLE_GROUPS = [
  "Chest", "Triceps", "Back", "Biceps", "Calves", "Quads",
  "Glutes", "Forearms", "Hamstrings", "Shoulders", "Abs"
];

const EQUIPMENT_TYPES = [
  "Bodyweight", "Barbell", "Machine", "Dumbbell", "Cable", "Smith Machine"
];


const Exercises = ({ colors, theme, user, navigate, isMobile, isAdmin, params }) => {
  const { exercises, addExercise, deleteExercise } = useExercises();
  const [open, setOpen] = useState(false);
  const [exerciseData, setExerciseData] = useState({
    name: "",
    description: "",
    muscle_group: "",
    equipment_type: ""
  });

  const handleCreate = async (exerciseData) => {
    if (!exerciseData.name.trim()) return alert("Exercise name is required.");
    if (!exerciseData.description.trim()) return alert("Description is required.");
    if (!exerciseData.muscle_group.trim()) return alert("Muscle group is required.");
    if (!exerciseData.equipment_type.trim()) return alert("Equipment type is required.");

    addExercise(exerciseData);
  };


  const columns = [
    ...(!isMobile ? [{ field: "id", headerName: "ID", flex: 0.1 }] : []),
    { field: "name", headerName: "Exercise Name", flex: 2 },
    { field: "muscle_group", headerName: "Muscle Group", flex: 1 },
    ...(!isMobile ? [{ field: "equipment_type", headerName: "Equipment", flex: 1 }] : []),
    ...(!isMobile ? [{ field: "description", headerName: "Description", flex: 4 }] : []),
    ...(isAdmin ? [{
      field: "actions",
      headerName: "",
      flex: 0.1,
      renderCell: (params) => {
        const handleDelete = () => {
          deleteExercise({ id: params.row.id });
        };

        const options = [
          { label: "Delete", icon: "disable", onClick: handleDelete },
        ];
        return <OptionsMenu options={options} />;
      },
    }] : []),
  ];

  return (
    <>
      <Box mb={1} p={3} display="flex" flexDirection="column">
        <Button label={"Add Exercise"} outlined text={"Add exercise"} onClick={() => setOpen(true)} />
      </Box>
      <DataGrid
        rows={exercises}
        columns={columns}
        density="compact"
        paginationMode="server"
        rowCount={0}
        sx={{
          p: 0,
          m: 0,
          '& .MuiDataGrid-header': {
            py: 0,
            px: 0.5,
          },
          '& .MuiIconButton-root': {
            padding: "0px",
            fontSize: "11px"
          }
        }}
      />
      <FormModal
        open={open}
        handleClose={() => setOpen(false)}
        title="Add Exercise"
        action={handleCreate}
        fields={[
          {
            name: "name",
            label: "Exercise Name",
          },
          {
            name: "description",
            label: "Description",
          },
          {
            name: "muscle_group",
            label: "muscleGroup",
            type: "select",
            options: MUSCLE_GROUPS.map((i) => ({
              label: i,
              value: i,
            })),
          },
          {
            name: "equipment_type",
            label: "equipmentType",
            type: "select",
            options: EQUIPMENT_TYPES.map((i) => ({
              label: i,
              value: i,
            })),
          },
        ]}
      />
    </>
  );
};

export default Exercises;
