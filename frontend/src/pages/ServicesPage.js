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
import { motion, Variants } from "framer-motion";

import BouncyCardAnimation from '../components/BouncyCardAnimation';

export default function ServicesPage() {
  let services = useSelector((state) => state.services);
  const navigate = useNavigate()
  services = services.services; // Annoying

  function addService() {
    navigate("../add-service")
  }

  return (
    <Box m={4}>
      <Box textAlign='center'>
        <Button variant="contained" onClick={() => addService()}>
          Add new service
        </Button>
      </Box>

      <Box m={4} />

      {services.map((service, index) => (
        <BouncyCardAnimation key={index}>
          <ServiceCard service={service} />
        </BouncyCardAnimation>
      ))}
    </Box>
  );
}
