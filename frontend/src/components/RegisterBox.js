import React, { useState } from "react";
import RegisterForm from './RegisterForm';

// Material UI
import {
  Paper,
} from "@mui/material";


function RegisterBox(props) {

  return (
    <Paper
      sx={{
        ...props.sx,
        textAlign: "center",
        borderRadius: "40px",
        // boxShadow: "0px 4px 35px rgba(0, 0, 0, 0.08)",
        pt: "30px",
        pb: "5px",
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}
      elevation={24}
    >
      <RegisterForm/>
    </Paper>
  );
}

export default RegisterBox;
