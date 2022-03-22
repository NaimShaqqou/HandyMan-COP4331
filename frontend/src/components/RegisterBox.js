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

function RegisterBox() {
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
      
      if (res.id <= 0) {
        setMessage("User/Password combination incorrect");
        alert('wrong credentials');
      } else {
        alert('Register Successful!');
        setMessage("Registered!");
        var storage = require("../tokenStorage.js");
        var user = jwt_decode(res);
        localStorage.setItem("user_data", JSON.stringify(user));
        storage.storeToken(res);
        // window.location.href = "/";
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
    email: '',
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
      <div className="loginDiv">
        <form onSubmit={doLogin}>
          <h3>Create an Account</h3>
          <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
            <Input
              id="registerFirstName"
              type='text'
              value={values.firstName}
              onChange={handleChange('firstName')}
              placeholder="First Name"
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
            <Input
              id="registerLastName"
              type='text'
              value={values.lastname}
              onChange={handleChange('lastName')}
              placeholder="Last Name"
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
            <Input
              id="registerUsername"
              type='text'
              value={values.username}
              onChange={handleChange('username')}
              placeholder="Username"
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
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

          <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
            <Input
              id="registerEmail"
              type='text'
              value={values.email}
              onChange={handleChange('email')}
              placeholder="Email"
            />
          </FormControl>
          <br /><br />
          <span id="registerResult">{message}</span>

          <p></p>

          <Button id="loginButton" variant="contained" type="submit">Register!</Button>
          <p className="alignbot">Already have an account? <a href="/login">Log in here!</a></p>
        </form>
      </div>
    </div>
  );
}

export default RegisterBox;
