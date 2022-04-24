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


export default function ServicesPage() {
  let services = useSelector((state) => state.services);
  const navigate = useNavigate()
  services = services.services; // Annoying

  function addService() {
    navigate("../add-service")
  }

  const cardVariants = {
    offscreen: {
      y: 500
    },
    onscreen: {
      y: 50,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  function Card({serviceCard}) {
  
    return (
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.div  variants={cardVariants}>
          {serviceCard}
        </motion.div>
      </motion.div>
    );
  }


  return (
    <div>
      {/* <ResponsiveAppBar/> */}
      <Box sx={{ pt: 4}}>

      <Grid item>
          <Box textAlign='center'>
          <Button variant="contained" onClick={() => addService()}>Add new service</Button>
          </Box>
        </Grid>
      
        <Box sx={{ pt: 4}} />
        
        <Grid container direction="column" spacing={5}>  
        {services.map((service, index) => (
          <Grid item key={index}>
            <Card serviceCard={<ServiceCard service={service} />}/>
          </Grid>
        ))}
      </Grid>
      </Box>
      
      
    </div>
  );
}
