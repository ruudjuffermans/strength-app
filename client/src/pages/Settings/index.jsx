import { Box, Modal, TextField, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import CustomPaper from "@components/CustomPaper";
import React, { useState } from "react";

const Settings = ({colors, theme, user, navigate, isMobile, params}) => {
  const [open, setOpen] = useState(false);

  // Functions to open and close the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <CustomButton variant="outlined" color="primary" onClick={handleOpen}>
            Open Modal
          </CustomButton>
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box>


        <CustomPaper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Modal Title
          </Typography>
          <Typography mb={2}>
            This is a simple modal. You can add more content here, like a form or settings.
          </Typography>
          <TextField
            fullWidth
            label="Input Field"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <CustomButton variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </CustomButton>
            <CustomButton variant="contained" color="primary" onClick={handleClose}>
              Save
            </CustomButton>
          </Box>
        </CustomPaper>
        </Box>
      </Modal>
    </Box>
  );
};

export default Settings;
