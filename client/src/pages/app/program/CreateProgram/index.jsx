import React, { useState } from "react";
import { Box } from "@mui/material";
import Button from "@components/buttons/Button";
import { usePrograms } from "@hooks/usePrograms";
import CustomInput from "@components/CustomInput";

const CreateProgram = ({ params, navigate, user, isAdmin }) => {
  const {
    createProgram,
  } = usePrograms();

  const [programData, setProgramData] = useState({
    id: null,
    name: "",
    description: "",
  });
  const [error, setError] = useState({ name: "", description: "" });

  const handleInputChange = (event) => {
    setProgramData({ ...programData, [event.target.name]: event.target.value });
  };

  const handleSaveProgram = () => {
    if (!programData.name.trim()) return setError({ ...error, name: "Program name is required." });
    if (!programData.description.trim()) return setError({ ...error, description: "Program description is required." });


      createProgram(programData);

  };


  return (
      <Box display="flex" flexWrap="wrap" gap="10px" >
      <CustomInput
            autoFocus
            margin="dense"
            label="Program Name"
            name="name"
            fullWidth
            value={programData.name}
            onChange={handleInputChange}
            error={!!error.name}
            helperText={error.name}
          />
          <CustomInput
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={programData.description}
            onChange={handleInputChange}
            error={!!error.description}
            helperText={error.description}
          />
          <Button onClick={handleSaveProgram} color="primary" label={"Save"} />
      </Box>
  );
};

export default CreateProgram;
