import { Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../reducerStore/index";
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/NavBar';
import UserRequestedService from "../components/UserRequestedService";
import axios from "axios";


export default function UserRequestedServices() {
  let user = useSelector((state) => state.user);
  const [requestedServices, setRequestedServices] = useState([]);
  let bp = require("../components/Path");

  const dispatch = useDispatch();
  const { updateCurrentUser } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    console.log("IN USE EFFECT")
    axios
        .post(bp.buildPath("api/services-user-booked"), {
          requesterId: user.userId,
          jwtToken: user.jwtToken
        })
        .then((response) => {
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


  async function getRequestedServices() {
    
  }




  return (
    <div>
      <ResponsiveAppBar/>
      <Box sx={{ pt: 4}}>
      <Grid container direction="column" spacing={5}>  
        {requestedServices.map((requestedService, index) => (
          <Grid item key={index}>
            <UserRequestedService requestedService={requestedService} />
          </Grid>
        ))}
      </Grid>
      </Box>
      
    </div>
  );
}
