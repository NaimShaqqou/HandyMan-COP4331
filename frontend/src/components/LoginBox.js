import React, { useState } from "react";
import '../Login.css'

import LoginForm from './LoginForm';

import {
  Paper
} from "@mui/material";

function LoginBox(props) {

  return (
    <Paper
      sx={{
        ...props.sx,
        textAlign: "center",
        borderRadius: "40px",
        // padding: "10px 0px 30px 10px",
        pt: "80px",
      }}
      elevation={24}
    >
      <LoginForm/>

    </Paper>
  );
}

export default LoginBox;
