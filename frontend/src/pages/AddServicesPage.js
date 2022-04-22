import { Button, Grid, Box } from "@mui/material";
import React, { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/NavBar';
import AddService from "../components/AddService";


export default function AddServicesPage() {
  return (
    <div>
      {/* <ResponsiveAppBar /> */}
      <Box m={5}/>
      <AddService />
    </div>
  );
}
