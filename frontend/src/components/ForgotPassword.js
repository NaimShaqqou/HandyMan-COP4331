import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ForgotPassword() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const doResetPassword = () => {

  };

  return (
    <div>
      <Button onClick={handleOpen}>Forgot Password?</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Reset Password
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Enter your email to reset your password.
          </Typography> */}
          <TextField
            id="outlined-basic"
            label="Email"
            variant="standard" 
            InputProps={{endAdornment: <Button onClick={doResetPassword}>Send</Button>}}    
          />
          <br />
          
        </Box>
      </Modal>
    </div>
  );
}