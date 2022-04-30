import { Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import { Container } from "@mui/material";
import { Box, Paper ,Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/NavBar';
import UserRequestedService from "../components/UserRequestedService";
import axios from "axios";
import { motion, Variants } from "framer-motion";
import emptyBookings from "../images/empty.png"
import { GifBoxTwoTone } from "@mui/icons-material";


export default function UserRequestedServices() {
  let user = useSelector((state) => state.user);
  const [requestedServices, setRequestedServices] = useState([]);
  const [fetchedData, setFetchedData] = useState(false)
  let bp = require("../components/Path");
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { updateCurrentUser, logoutUser, logoutServices } = bindActionCreators(actionCreators, dispatch);

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
            if (response.data.jwtToken === "") {
              logoutUser()
              logoutServices()
              navigate("../login")
            } else {
              setFetchedData(true)
            
              if (response.data.error === "") {
                let refreshedToken = response.data.refreshedToken
                let array = response.data.results
                array.sort((a, b) => {
                  let da = new Date(a.Dates[1])
                  let db = new Date(b.Dates[1])
                  return db - da
                })
                setRequestedServices(array);
                updateCurrentUser({ ...user, jwtToken: refreshedToken })
              } else {
                console.log(response.data.error)
              }

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
        viewport={{ once: true, amount: 0.8}}
      >
        <motion.div  variants={cardVariants}>
          {serviceCard}
        </motion.div>
      </motion.div>
    );
  }

  console.log(requestedServices)

  return (
    <Box m={4}>
      {requestedServices.length === 0 && fetchedData ? 
      <Box sx={{
          // justifyContent: 'center', 
          // bgcolor: 'green' 
        }}
      >
        <Paper
          elevation= {5}
          sx={{
            maxWidth: '1200px',
            height: '80vh',
            margin: "auto",
            p: 10,
            textAlign: 'center', 
            // display: 'flex',
            // flexDirection: 'column',
            // justifyContent: 'space-between',
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "white",
          }}
        >
          <Typography variant="h2" >
            You don't have any bookings
          </Typography>
          {/* <Box m={10} sx={{ bgcolor: 'green' }}/> */}
          <Box sx={{
              mt: 10,
              mb: 10,
              ml: 'auto',
              mr: 'auto',
              width: '80%',
              height: '80%',
              // bgcolor: 'green'
            }}
          >
            <img
              src={emptyBookings} 
              style={{
                width: '100%', 
                height: '100%',
                objectFit: 'contain',
                // aspectRatio: 863/645
              }} 
              alt="People looking into empty box" 
            />
          </Box>
        </Paper>
      </Box>
      : 
      requestedServices.map((requestedService, index) => 
        <Grid container direction="column" spacing={5} >  
      
          <Grid item key={index}>
            <Card serviceCard={<UserRequestedService requestedService={requestedService} />}/>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
