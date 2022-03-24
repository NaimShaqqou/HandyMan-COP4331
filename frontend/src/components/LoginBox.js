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
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { Input } from "@mui/material";

function LoginBox() {
  var bp = require("./Path.js");

  const [message, setMessage] = useState("");

  const doLogin = async (event) => {
    event.preventDefault();
    
    var obj = { login: values.username, password: values.password };
    var js = JSON.stringify(obj);

    // alert('click');

    try {
      const response = await fetch(bp.buildPath("api/login"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      
      if ("jwtToken" in res) {
        alert('login success!');
        setMessage("Logged in");
        var storage = require("../tokenStorage.js");
        var user = jwt_decode(res["jwtToken"]);
        localStorage.setItem("user_data", JSON.stringify(user));
        storage.storeToken(res["jwtToken"]);
        // window.location.href = "/";
      } else {
        alert('wrong credentials');
        setMessage("User/Password combination incorrect");
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
    // <div className="loginbox">
    <Box style={classes.paper} sx={{
      // width: {
      //   mobile: 100,
      //   laptop: 300,
      //   desktop: 720,
      // },
      // maxHeight: { xs: 500, md: 700 },
      // height: 1000,
      minHeight: {
        sm: 300,
        md: 400 
      },
      // maxWidth: 500,
      // minWidth: 500,
      // maxWidth: {
      //   sx: true,
      //   md: 500
      // },
      minWidth: {
        sm: 385,
        md: 550
      },
      // display: 'flex',
      // flexDirection: { xs: 'column', md: 'row' },
      // alignItems: 'center',
      // bgcolor: 'background.paper',
      // overflow: 'hidden',
      // borderRadius: '12px',
      // boxShadow: 1,
      // fontWeight: 'bold',
    }}>

      <form onSubmit={doLogin}>
        <h3>Login to continue!</h3>
        <FormControl sx={classes.text} variant="standard">
          {/* <InputLabel htmlFor="loginUsername">Username</InputLabel> */}
          <Input
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
        <p>
          <a href="https://www.google.com">Forgot Password?</a>
        </p>

        <span id="loginResult">{message}</span>

        <p></p>

        <Button id="loginButton" variant="contained" type="submit">Log in</Button>

        <br />
        <br />
        <span>New to Handler?</span>
        <br />
        <a href="https://www.google.com">Create a New Account!</a>
      </form>
    </Box>
    // </div>
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
