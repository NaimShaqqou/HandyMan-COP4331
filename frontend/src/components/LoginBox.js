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
  Typography, Grid
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from 'framer-motion';

function LoginBox(props) {
  var bp = require("./Path.js");
  var md5 = require('md5');

  const dispatch = useDispatch();
  const { updateCurrentUser, loginServices } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const [message, setMessage] = useState("");

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
        setMessage("Logged in " + res.firstName + " " + res.lastName);
        console.log("Logged in " + res.firstName + " " + res.lastName);
        updateCurrentUser(res);
        loginServices(res.services);
        navigate("../");
      } else if (res.error == "Incorrect credentials") {
        setInvalidCredentials(true);
        setMessage(res.error);
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
    if (invalidCredentials) setInvalidCredentials(false);
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
    <Box
      sx={{
        ...classes.paper,
        ...props.sx,
      }}
    >
      <Box m={10}/>
      <form onSubmit={doLogin}>
        <Typography variant='h5'>
          Login to Continue
        </Typography>

        <Box m={2}/>

        <FormControl sx={classes.text} variant="standard">
          {/* <InputLabel htmlFor="loginUsername">Username</InputLabel> */}
          <Input
            error={invalidCredentials}
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
            error={invalidCredentials}
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
        {/* <span id="loginResult">{message}</span> */}
      </form>

      <AnimatePresence
        intial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >

        {invalidCredentials &&
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
              Invalid Credentials
            </Alert>
          </Box>
        </motion.div>}
      </AnimatePresence>

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
    padding: "10px 0px 30px 10px",
    backgroundColor: "white",
    // minHeight: {xs: 500, md: 700 },
    // "width": "700px",
    // "height": "500px",
  },
  text: {
    m: 1,
    width: '25ch',
  }
};

export default LoginBox;
