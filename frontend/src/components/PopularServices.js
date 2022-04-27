import React, { useState, useEffect } from 'react'

import {
  Box, Paper,
  Stack, Card,
  Typography,
  Container, Grid
} from "@mui/material";

import ServiceCard from "../components/ServiceCard";
import PopularServiceCard from "../components/PopularServiceCard";

export default function PopularServices() {

  const [popularServices, setPopularServices] = useState([]);

  const [userLocation, setUserLocation] = useState(null);

  let bp = require("./Path");

  console.log(popularServices);

  useEffect(() => {
    updatePopularServices();
  }, []);

  const updatePopularServices = async () => {
    var obj = {
      search: '',
      category: '',
      location: 'Orlando, FL',
      maxDist: 15,
    };

    let js = JSON.stringify(obj);
    // console.log('search input:');
    // console.log(obj);
  
    if (userLocation)
      obj.location = userLocation;

    js = JSON.stringify(obj);
    // console.log('sending:');
    // console.log(obj);

    try {
      const response = await fetch(bp.buildPath("api/search-services"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());

      // Sort by title
      res.results.sort((a, b) => (b.Title.localeCompare(a.Title) == -1 ? 1 : -1));

      setPopularServices(res.results);
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  return (
    <Box>
      <Typography variant='h4'>
        Discover Popular Services
      </Typography>

      {popularServices.length > 0 && <PopularServiceCard service={popularServices[0]}/>}

      {/* <PopularServiceCard service={popularServices[0]}/> */}
      {/* {popularServices.map((service, index) => (
        <Grid item key={index}>
          <Card serviceCard={<ServiceCard service={service} />}/>
        </Grid>
      ))} */}
    </Box>
  )
}
