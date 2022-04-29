import React, { useState, useEffect } from 'react'

import {
  Box, Paper,
  Stack, Card,
  Typography,
  Container, Grid
} from "@mui/material";

import ServiceCard from "../components/ServiceCard";
import PopularServiceCard from "../components/PopularServiceCard";

import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { motion } from "framer-motion"

export default function PopularServices() {

  const [popularServices, setPopularServices] = useState([]);
  // const [opacity, setOpacity] = useState(1);
  const [margin, setMargin] = useState(0);
  // const [userLocation, setUserLocation] = useState(null);

  let bp = require("./Path");

  const animationStart = 0;

  useScrollPosition(({ currPos }) => {
    
    // let newOpacity = 1;
    let newMargin = 0;
    
    if (-currPos.y > animationStart) {
      const progress = (-currPos.y / window.innerHeight) - (animationStart / window.innerHeight);
      console.log(currPos);

      // newOpacity = 1 - progress * 1;
      newMargin = progress * 30;
    }
    
    // if (newOpacity != opacity)
    //   setOpacity(newOpacity);

    if (newMargin != margin)
      setMargin(newMargin);
  });

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
    <Box sx={{
      width: '100vw',
      textAlign: 'center',
      color: '#003c80',
      fontSize: '75px',
      overflow: 'clip',
    }}>
      {popularServices.map((service, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ display: 'inline-block' }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{  }}
        >
          <PopularServiceCard  serviceWithRating={service}/>
        </motion.div>
      ))}

    </Box>
  )
}
