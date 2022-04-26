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
      y: 500,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  function Card({children}) {
  
    return (
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        // whileHover={{ y: -20 }}
        // onHoverStart={e => {}}
        // onHoverEnd={e => {}}
        // style={{ backgroundColor: 'green' }}
      >
        <motion.div 
          variants={cardVariants} 
          // style={{ display: 'inline', backgroundColor: 'green' }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }


  return (
    <div>
      {/* <ResponsiveAppBar/> */}
      <Box sx={{ pt: 4 }}>

      <Grid item>
          <Box textAlign='center'>
          <Button variant="contained" onClick={() => addService()}>Add new service</Button>
          </Box>
        </Grid>
      
        <Box sx={{ pt: 4}} />
        
        <Grid container direction="column" spacing={5}>  
        {services.map((service, index) => (
          <Grid item key={index}>
            <Card>
              <ServiceCard service={service} />
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>
      
      
    </div>
  );
}
