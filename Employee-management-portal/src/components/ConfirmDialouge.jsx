import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import { LogoutOutlined } from "@mui/icons-material";

import "../styles/ConfirmDialouge.css";

const ConfirmDialouge = ({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      className="confirm-dialog"
    >
      <DialogTitle className="confirm-dialog-title">
        <div className="confirm-dialog-icon">
          <LogoutOutlined />
        </div>

        <span>{title}</span>
      </DialogTitle>

      <DialogContent className="confirm-dialog-content">
        <Typography className="confirm-dialog-message">{message}</Typography>
      </DialogContent>

      <DialogActions className="confirm-dialog-actions">
        <Button onClick={onCancel} className="confirm-dialog-cancel">
          {cancelText}
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          className="confirm-dialog-confirm"
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialouge;
