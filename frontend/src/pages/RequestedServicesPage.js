import { Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import { useNavigate, useLocation } from 'react-router-dom';
import ResponsiveAppBar from '../components/NavBar';
import RequestedService from "../components/RequestedService"
import axios from "axios";


export default function RequestedServicesPage() {
  let user = useSelector((state) => state.user);
  const { state } = useLocation()
  console.log(state)
  const [requestedServices, setRequestedServices] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  let bp = require("../components/Path");

  const dispatch = useDispatch();
  const { updateCurrentUser } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    console.log("IN USE EFFECT")
    axios
        .post(bp.buildPath("api/requested-service-history"), {
          serviceId: state._id,
          jwtToken: user.jwtToken
        })
        .then((response) => {
            setFetchedData(true)
          if (response.data.error === "") {
            let refreshedToken = response.data.refreshedToken
            setRequestedServices(response.data.results);
            updateCurrentUser({ ...user, jwtToken: refreshedToken })
          } else {
            console.log(response.data.error)
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  return (
    <div>
      <ResponsiveAppBar/>
      <Box sx={{ pt: 4}}>
      <Grid container direction="column" spacing={5}>  
        {requestedServices.length === 0 && fetchedData 
            ? 
                <Grid item sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="h2">You don't have any requests</Typography> 
                </Grid>
            : requestedServices.map((requestedService, index) => (
            <Grid item key={index}>
                <RequestedService requestedService={requestedService} />
            </Grid>
            ))}
      </Grid>
      </Box>
      
    </div>
  );
}
