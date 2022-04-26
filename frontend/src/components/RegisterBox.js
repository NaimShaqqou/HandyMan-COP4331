import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import '../Login.css'

// Material UI
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Input, 
  Typography,
  Box,
  FormControl,
  InputAdornment,
  Button,
  IconButton,
  Alert,
  FormHelperText
} from "@mui/material";

import { motion, AnimatePresence } from 'framer-motion';

function RegisterBox(props) {
  var bp = require("./Path.js");

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorHighlight, setErrorHighlight] = useState('');
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

  // validate email using regex
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const doRegister = async (event) => {
    event.preventDefault();

    setErrorHighlight('');
    setErrorMsg('');

    if (values.firstName == '' || values.lastName == '') {
      setErrorHighlight('name');
      setErrorMsg('Please enter a first and last name.');
      return;
    }
    
    if (values.username.length < 4) {
      setErrorHighlight('username');
      setErrorMsg('Username must be at least 4 characters.');
      return;
    }

    if (!validateEmail(values.email)) {
      setErrorHighlight('email');
      setErrorMsg('Please enter a valid email.');
      return;
    }

    if (values.password !== values.rpassword) {
      setErrorHighlight('pass');
      setErrorMsg('Passwords do not match.');
      return;
    }

    var obj = {
      email: values.email.toLowerCase(),
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username
    };

    var js = JSON.stringify(obj);

    try {
      const response = await fetch(bp.buildPath("api/register"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());

      if (res.error === "") {
        console.log('account created');
        setSuccessMsg('Account successfully created. You must verify your email before you can log in.');
      } else {
        console.log(res.error);

        if (res.error.startsWith('Username already exists.')) {
          setErrorMsg('Username already exists.');
          setErrorHighlight('username');
        }
        else if (res.error.startsWith('Email already exists.')) {
          setErrorMsg('Email already exists.');
          setErrorHighlight('email');
        }
      }
    } catch (e) {
      console.log(e.toString());
      return; 
    }
  };

  const handleChange = (prop) => (event) => {
    setSuccessMsg('');
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
    <Box
      style={classes.paper}
      sx={{
        ...props.sx,
      }}
    >
      <Box m={3}/>
        <form onSubmit={doRegister}>
          <Typography variant='h5'>
            Create an Account
          </Typography>

          <Box m={2}/>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <Input
              error={errorHighlight == 'name'}
              type='text'
              value={values.firstName}
              onChange={handleChange('firstName')}
              placeholder="First Name"
            />
            {errorHighlight == 'name' && <FormHelperText sx={{color: 'error.main'}}>First Name</FormHelperText>}
          </FormControl>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <Input
              error={errorHighlight == 'name'}
              type='text'
              value={values.lastname}
              onChange={handleChange('lastName')}
              placeholder="Last Name"
            />
            {errorHighlight == 'name' && <FormHelperText sx={{color: 'error.main'}}>Last Name</FormHelperText>}
          </FormControl>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <Input
              error={errorHighlight == 'username'}
              type='text'
              value={values.username}
              onChange={handleChange('username')}
              placeholder="Username"
            />
            {errorHighlight == 'username' && <FormHelperText sx={{color: 'error.main'}}>Username</FormHelperText>}
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <Input
              error={errorHighlight == 'email'}
              type='text'
              value={values.email}
              onChange={handleChange('email')}
              placeholder="Email"
            />
            {errorHighlight == 'email' && <FormHelperText sx={{color: 'error.main'}}>Email</FormHelperText>}
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <Input
              error={errorHighlight == 'pass'}
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
            {errorHighlight == 'pass' && <FormHelperText sx={{color: 'error.main'}}>Password</FormHelperText>}
          </FormControl>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <Input
              error={errorHighlight == 'pass'}
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
            {errorHighlight == 'pass' && <FormHelperText sx={{color: 'error.main'}}>Repeat password</FormHelperText>}
          </FormControl>
          
          <br /><br />
          {/* <Button id="registerButton" variant="contained" type="submit">Register</Button> */}

          <motion.button
            whileHover={{
              scale: 0.9,
              backgroundColor: '#003c80',
            }}
            // onHoverStart={e => {}}
            // onHoverEnd={e => {}}
            style={{
              width: 100,
              height: 45,
              borderRadius: 10,
              borderWidth: 0,
              backgroundColor: '#005cc4',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            <Typography sx={{ fontSize: 17 }}>
              Register
            </Typography>
          </motion.button>

          <AnimatePresence>
            {successMsg != '' &&
            <motion.div
              initial='hidden' 
              animate='visible'
              exit='exit'
              variants={{
                hidden: {
                  scale: .8,
                  opacity: 0
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                },
                exit: {
                  scale: 0,
                  opacity: 0
                }
              }}
            >
              <Box m={3}>
                <Alert
                  severity='success'
                  sx={{ mb: 2 }}
                >
                  {successMsg}
                </Alert>
              </Box>
            </motion.div>}
          </AnimatePresence>

          <AnimatePresence>
            {errorMsg != '' &&
            <motion.div
              initial='hidden' 
              animate='visible'
              exit='exit'
              variants={{
                hidden: {
                  scale: .8,
                  opacity: 0
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                },
                exit: {
                  scale: 0,
                  opacity: 0
                }
              }}
            >
              <Box m={3}>
                <Alert
                  severity='error'
                  sx={{ mb: 2 }}
                >
                  {errorMsg}
                </Alert>
              </Box>
            </motion.div>}
          </AnimatePresence>
          {/* <span id="registerResult">{message}</span> */}
        </form>
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
    backgroundColor: "white",
    // minHeight: {xs: 500, md: 700 },
    // "width": "700px",
    // "height": "500px",
  }
};

export default RegisterBox;
