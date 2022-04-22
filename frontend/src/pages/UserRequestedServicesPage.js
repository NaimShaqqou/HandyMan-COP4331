import { Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import { Container } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/NavBar';
import UserRequestedService from "../components/UserRequestedService";
import axios from "axios";
import { motion, Variants } from "framer-motion";


export default function UserRequestedServices() {
  let user = useSelector((state) => state.user);
  const [requestedServices, setRequestedServices] = useState([]);
  const [fetchedData, setFetchedData] = useState(false)
  let bp = require("../components/Path");

  const dispatch = useDispatch();
  const { updateCurrentUser } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    console.log("IN USE EFFECT OF PAGE")
    let mounted = true;
    axios
        .post(bp.buildPath("api/services-user-booked"), {
          requesterId: user.userId,
          jwtToken: user.jwtToken
        })
        .then((response) => {
          if (mounted) {
            setFetchedData(true)
            
            if (response.data.error === "") {
              let refreshedToken = response.data.refreshedToken
              setRequestedServices(response.data.results);
              updateCurrentUser({ ...user, jwtToken: refreshedToken })
            } else {
              console.log(response.data.error)
            }
          }
          
        })
        .catch((error) => {
          console.log(error);
        });
        return () => mounted = false;
  }, []);


  const cardVariants = {
    offscreen: {
      y: 300
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
        viewport={{ once: true, amount: 1, fallback: fetchedData ? true : false}}
      >
        <motion.div  variants={cardVariants}>
          {serviceCard}
        </motion.div>
      </motion.div>
    );
  }

  console.log(requestedServices)


  return (
    <div>
      {/* <ResponsiveAppBar/> */}
      <Box sx={{ pt: 4}}>
      <Grid container direction="column" spacing={5}>  
        {requestedServices.length === 0 && fetchedData
            ? 
                <Grid item sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="h2">You don't have any bookings</Typography> 
                </Grid>
          : requestedServices.map((requestedService, index) => requestedService.Accepted ? (
          <Grid item key={index}>
            <Card serviceCard={<UserRequestedService requestedService={requestedService} />}/>
          </Grid>
        ) : "")}
      </Grid>
      </Box>
      
    </div>
  );
}
