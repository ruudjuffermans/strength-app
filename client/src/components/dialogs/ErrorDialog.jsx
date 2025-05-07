import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import Button from "@components/buttons/Button";

const ErrorDialog = ({
  open,
  onClose,
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  buttonLabel = "OK",
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: "error.main" }}>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} label={buttonLabel} color="error" variant="contained" />
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
