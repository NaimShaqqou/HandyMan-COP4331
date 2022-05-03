import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import '../Login.css'

import ForgotPassword from './ForgotPassword';

// Material UI
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import FormControl from '@mui/material/FormControl';
import Box from "@mui/material/Box"
import {
  Input, Alert,
  Typography, Grid,
  Paper, Collapse
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

import { motion, AnimatePresence } from 'framer-motion';

const classes = {
  text: {
    m: 1,
    width: '25ch',
  }
};

export default function LoginForm() {
  var bp = require("./Path.js");
  var md5 = require('md5');

  const dispatch = useDispatch();
  const { updateCurrentUser, loginServices } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    show: false,
    severity: 'success',
    msg: '',
  });
  console.log(alert);

  const doLogin = async (event) => {
    event.preventDefault();

    var obj = { 
      login: values.username, 
      password: md5(values.password)
    };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(bp.buildPath("api/login"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());

      if (res.error == "") {
        console.log("Logged in " + res.firstName + " " + res.lastName);
        updateCurrentUser(res);
        loginServices(res.services);
        navigate("../");
      } else if (res.error == "Incorrect credentials") {
        setAlert({
          show: true,
          severity: 'error',
          msg: 'Invalid Credentials'
        })
        console.log(res.error);
      } else if (res.error == "Account has not been verified!") {
        setAlert({
          show: true,
          severity: 'error',
          msg: 'Account has not been verified. Please check your email.'
        })
        console.log(res.error);
      } else {
        console.log(res.error);
      }
    } catch (e) {
      console.log(e.toString());
      return; 
    }
  };

  const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    // if (alert.show) {
    //   setAlert(prev => ({...prev, show: false}));
    // }
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

  return (
    <div>
      <form onSubmit={doLogin}>
        <Typography variant='h5'>
          Login to Continue
        </Typography>

        <Box m={2}/>

        <FormControl sx={classes.text} variant="standard">
          {/* <InputLabel htmlFor="loginUsername">Username</InputLabel> */}
          <Input
            error={alert.show && alert.msg == 'Invalid Credentials'}
            id="loginUsername"
            type='text'
            value={values.username}
            onChange={handleChange('username')}
            placeholder="Username"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>

        <br />

        <FormControl sx={classes.text} variant="standard">
          {/* <InputLabel htmlFor="loginPassword">Password</InputLabel> */}
          <Input
            error={alert.show && alert.msg == 'Invalid Credentials'}
            id="loginPassword"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            placeholder="Password"
            startAdornment={
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            }
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

        <Box m={3}/>

        {/* <Button id="loginButton" variant="contained" type="submit">
          Log in
        </Button> */}
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
            Log in
          </Typography>
        </motion.button>
        <Box m={3}/>

        <ForgotPassword/>
      </form>
      <Box sx={{ width: '90%', m: 3 }}>
        <Collapse in={alert.show}>
          <Alert
            severity={alert.severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlert(prev => ({ ...prev, show: false}));
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alert.msg}
          </Alert>
        </Collapse>
      </Box>
    </div>
  )
}
