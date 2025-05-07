import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import Button from "@components/buttons/Button";

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm",
  message = "Are you sure you want to proceed?",
  confirmLabel = "Yes",
  cancelLabel = "Cancel",
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} label={cancelLabel} color="inherit" variant="outlined" />
        <Button onClick={onConfirm} label={confirmLabel} color="secondary" variant="contained" />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
