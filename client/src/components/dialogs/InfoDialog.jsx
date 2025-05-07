import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import Button from "@components/buttons/Button";

const InfoDialog = ({ open, onClose, title, message, confirmLabel = "OK", onConfirm }) => {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          label={confirmLabel}
          onClick={handleConfirm}
          color="secondary"
          variant="contained"
        />
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
