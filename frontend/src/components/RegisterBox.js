import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import '../Login.css'

// Material UI
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import FormControl from '@mui/material/FormControl';
import { Input } from "@mui/material";
import Box from "@mui/material/Box"

function RegisterBox() {
  var bp = require("./Path.js");

  const [message, setMessage] = useState('');

  const doRegister = async (event) => {
    event.preventDefault();

    if (values.password !== values.rpassword) {
      alert("Passwords do not match");
      setMessage("Passwords do not match");
      return;
    }

    var obj = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username
    };

    var js = JSON.stringify(obj);

    // alert('click');

    try {
      const response = await fetch(bp.buildPath("api/register"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());

      if (res.error == "") {
        setMessage("Account Created Successfully! Please check your email to verify.");
      } else {
        setMessage(res.error);
      }
    } catch (e) {
      console.log(e.toString());
      return; 
    }
  };

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    rpassword: '',
    email: '',
    showPassword: false,
    rshowPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const rhandleClickShowPassword = () => {
    setValues({
      ...values,
      rshowPassword: !values.rshowPassword,
    });
  };

  const rhandleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box style={classes.paper} sx={{
      minHeight: {
        sm: 300,
        md: 400 
      },
      minWidth: {
        sm: 385,
        md: 450
      },
    }}>
      <div>
        <form onSubmit={doRegister}>
          <h3>Create an Account</h3>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <Input
              id="registerFirstName"
              type='text'
              value={values.firstName}
              onChange={handleChange('firstName')}
              placeholder="First Name"
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <Input
              id="registerLastName"
              type='text'
              value={values.lastname}
              onChange={handleChange('lastName')}
              placeholder="Last Name"
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <Input
              id="registerUsername"
              type='text'
              value={values.username}
              onChange={handleChange('username')}
              placeholder="Username"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <Input
              id="registerEmail"
              type='text'
              value={values.email}
              onChange={handleChange('email')}
              placeholder="Email"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <Input
              id="loginPassword"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              placeholder="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <Input
              id="rloginPassword"
              type={values.rshowPassword ? 'text' : 'password'}
              value={values.rpassword}
              onChange={handleChange('rpassword')}
              placeholder="Repeat Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle pass1 visibility"
                    onClick={rhandleClickShowPassword}
                    onMouseDown={rhandleMouseDownPassword}
                  >
                    {values.rshowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          
          <br /><br />
          <Button id="registerButton" variant="contained" type="submit">Register!</Button>
          <br /><br />
          <span id="registerResult">{message}</span>
        </form>
      </div>
    </Box>
  );
}

const classes = {
  paper: {
    // padding: 20,
    textAlign: "center",
    // color: "black",
    borderRadius: "40px",
    boxShadow: "0px 4px 35px rgba(0, 0, 0, 0.08)",
    padding: "10px 00px 30px 10px",
    // minHeight: {xs: 500, md: 700 },
    // "width": "700px",
    // "height": "500px",
  }
};

export default RegisterBox;
