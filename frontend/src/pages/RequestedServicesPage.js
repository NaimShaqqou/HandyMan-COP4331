import { Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import { Container, Typography } from "@mui/material";
import { Box, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import { useNavigate, useLocation } from 'react-router-dom';
import ResponsiveAppBar from '../components/NavBar';
import RequestedService from "../components/RequestedService"
import axios from "axios";
import { motion, Variants } from "framer-motion";
import emptyBookings from "../images/empty.png"


export default function RequestedServicesPage() {
  let user = useSelector((state) => state.user);
  const { state } = useLocation()
  console.log(state)
  const [requestedServices, setRequestedServices] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  let bp = require("../components/Path");
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { updateCurrentUser, logoutUser, logoutServices } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    console.log("IN USE EFFECT")
    let mounted = true;
    axios
        .post(bp.buildPath("api/requested-service-history"), {
          serviceId: state._id,
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

                // sort array by dates
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
        viewport={{ once: true, amount: 0.8 }}
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
              <Paper
              elevation= {5}
              sx={{
                  margin: "auto",
                  p: 10,
                  backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "white",
              }}
          >
                <Box sx={{pt: "100px",  display: 'flex', flexDirection: 'column'}}>
                  <Typography variant="h2">You don't have any requests</Typography> 
                  <Box sx={{ height: 600, pt: 20 }} >
                    <img src={emptyBookings} style={{width: "100%", height: "100%", aspectRatio: 863/645}} alt="People looking into empty box" />
                  </Box>
                </Box>
                </Paper>
            </Grid>
            : requestedServices.map((requestedService, index) => (
            <Grid item key={index}>
                <Card serviceCard={<RequestedService requestedService={requestedService} />}/>
            </Grid>
            ))}
      </Grid>
      </Box>
      
    </div>
  );
}
