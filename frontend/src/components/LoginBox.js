import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import '../LoginBox.css'

// Material UI
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Input } from "@mui/material";

function LoginBox() {
  var bp = require("./Path.js");
  var loginEmail;
  var loginPassword;

  const [message, setMessage] = useState("");
  
  const doLogin = async (event) => {
    event.preventDefault();
    
    var obj = { email: values.username, password: values.password };
    var js = JSON.stringify(obj);

    alert('click');

    try {
      const response = await fetch(bp.buildPath("api/login"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      
      if (res.id <= 0) {
        setMessage("User/Password combination incorrect");
      } else {
        setMessage("");
        var storage = require("../tokenStorage.js");
        var user = jwt_decode(res);
        localStorage.setItem("user_data", JSON.stringify(user));
        storage.storeToken(res);
        window.location.href = "/";
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
    <div className="loginbox">
      <div id="loginDiv">
        <form onSubmit={doLogin}>
          <h2>Welcome to Handler</h2>
          <h3>Login to continue!</h3>

          <div className="innerbox">

            <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
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

            <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
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
            <p className="alignbot">New to Handler? <a href="https://www.google.com">Create a New Account!</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginBox;
