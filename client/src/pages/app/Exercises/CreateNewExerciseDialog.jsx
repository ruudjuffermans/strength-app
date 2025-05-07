import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import Button from "@components/buttons/Button";
import { Formik } from "formik";
import * as yup from "yup";

const MUSCLE_GROUPS = [
  "Chest", "Triceps", "Back", "Biceps", "Calves", "Quads",
  "Glutes", "Forearms", "Hamstrings", "Shoulders", "Abs"
];

const EQUIPMENT_TYPES = [
  "Bodyweight", "Barbell", "Machine", "Dumbbell", "Cable", "Smith Machine"
];

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  muscle_group: yup.string().oneOf(MUSCLE_GROUPS).required("Muscle group is required"),
  equipment_type: yup.string().oneOf(EQUIPMENT_TYPES).required("Equipment type is required"),
});

const CreateExerciseDialog = ({ open, onClose, onSubmit }) => {
  const initialValues = {
    name: "",
    description: "",
    muscle_group: "",
    equipment_type: "",
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Exercise</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
          onClose();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={3}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Muscle Group"
                    name="muscle_group"
                    value={values.muscle_group}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.muscle_group && Boolean(errors.muscle_group)}
                    helperText={touched.muscle_group && errors.muscle_group}
                  >
                    {MUSCLE_GROUPS.map((group) => (
                      <MenuItem key={group} value={group}>
                        {group}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Equipment Type"
                    name="equipment_type"
                    value={values.equipment_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.equipment_type && Boolean(errors.equipment_type)}
                    helperText={touched.equipment_type && errors.equipment_type}
                  >
                    {EQUIPMENT_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} label="Cancel" variant="outlined" color="inherit" />
              <Button onClick={handleSubmit} label="Create" variant="contained" color="secondary" />
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateExerciseDialog;
