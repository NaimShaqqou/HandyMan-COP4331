import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Input } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #0091ff',
  boxShadow: 24,
  p: 4,
};

export default function ForgotPassword() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleChange = () => (event) => {
    setEmail(event.target.value);
  };

  let bp = require("./Path.js");

  const doResetPassword = async (event) => {
    event.preventDefault();
  
    var obj = {
      email: email.toLowerCase()
    };
  
    var js = JSON.stringify(obj);
  
    try {
      const response = await fetch(bp.buildPath("api/forgot-password-email"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
  
      if (res.error === "") {
        console.log(res.success);
        setMessage(res.success);
      } else {
        console.log(res.error);
        setMessage(res.error);
      }
    } catch (e) {
      console.log(e.toString());
      return; 
    }
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
          <form onSubmit={doResetPassword}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Reset Password
            </Typography>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="standard" 
                value={email}
                onChange={handleChange()}
                InputProps={{endAdornment: <Button onClick={doResetPassword}>Send</Button>}}    
              />
              {/* <Button onClick={doResetPassword}>Send</Button> */}
            </FormControl>
          </form>
          <Typography
            id="modal-modal-title"
            variant="subtitle1"
            component="h2"
            style={{paddingLeft: '8px'}}
          >
            {message}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}