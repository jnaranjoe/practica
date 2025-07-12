import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function ForgotPassword({ open, handleClose }) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError(true);
      setHelperText("Please enter a valid email address.");
      return;
    }
    setError(false);
    setHelperText("");
    alert(`Password recovery link sent to ${email}`);
    handleClose();
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError(false);
      setHelperText("");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Forgot Password</DialogTitle>
      <DialogContent>
        <form id="forgot-password-form" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="forgot-email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={handleChange}
            error={error}
            helperText={helperText}
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          form="forgot-password-form"
          type="submit"
          color="primary"
          variant="contained"
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
