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

  // console.log(popularServices);

  useEffect(() => {
    updatePopularServices();
  }, []);

  const updatePopularServices = async () => {
    var obj = {
      "numOfServices": "4"
    };

    let js = JSON.stringify(obj);

    try {
      const response = await fetch(bp.buildPath("api/best-reviewed-services"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());

      // Sort by title
      // res.results.sort((a, b) => (b.Title.localeCompare(a.Title) == -1 ? 1 : -1));

      setPopularServices(res.topServices);
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

      {/* {popularServices.length > 0 && <PopularServiceCard serviceWithRating={popularServices[0]}/>} */}

      {popularServices.map((service, index) => (
        <PopularServiceCard key={index} serviceWithRating={service}/>
      ))}
    </Box>
  )
}
