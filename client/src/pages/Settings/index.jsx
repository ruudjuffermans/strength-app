import { Box, Modal, TextField, Typography } from "@mui/material";
import Button from "@components/buttons/Button";
import BasePaper from "@components/papers/BasePaper";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";

const Settings = ({ colors, theme, user, navigate, isMobile, params }) => {
  const [open, setOpen] = useState(false);

  // Functions to open and close the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Button label={"Open Modal"} variant="outlined" color="primary" onClick={handleOpen} />
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box>
          <BasePaper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
            }}
          >
            <Typography variant="h3" mb={1}>
              Modal Title
            </Typography>
            <Typography variant="body2">
              This is a simple modal. You can add more content here, like a form or settings.
            </Typography>
            <Box my={6}>

              <CustomInput
                fullWidth
                label="Input Field"
                variant="outlined"
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" label={"Cancel"} color="secondary" onClick={handleClose} />
              <Button variant="contained" label={"Save"} color="primary" onClick={handleClose} />
            </Box>
          </BasePaper>
        </Box>
      </Modal>
    </Box>
  );
};

export default Settings;
