import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/NavBar';
import EditService from "../components/EditService";
import { useLocation } from 'react-router-dom';


export default function EditServicePage() {
  const { state } = useLocation()
  return (
    <div>
      {/* <ResponsiveAppBar /> */}
      <EditService service={state}/>
    </div>
  );
}
