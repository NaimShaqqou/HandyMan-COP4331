import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";

import {
  Box, Paper,
  Stack, Card,
  Typography,
  Container, Grid
} from "@mui/material";


export default function PopularServiceCard({serviceWithRating}) {
  let navigate = useNavigate();

  const getImage = (item) => {
    if (item.Images.length > 0) return item.Images[0];
    // return breadurl;
    return require('../images/no-image-icon.png');
  };

  const service = serviceWithRating.service;

  console.log(serviceWithRating);

  return (
    <Paper 
      sx={{
        width: '300px',
        height: '400px',
        borderRadius: 10,
        cursor: 'pointer',
        display: 'inline-block',
        m: 3,
        overflow: 'clip'
        // bgcolor: 'green'
      }}
      onClick={() => navigate("/service", { state: { service: service } })}
    >
      <img
        style={{
          // margin: 'auto',
          display: 'block',
          // maxWidth: '100%',
          // maxHeight: '100%',
          width: '100%',
          height: '102%',
          objectFit: 'cover',
          m: 0,
          p:0,
          // verticalAlign: 'bottom',
          // lineHeight: 1,
          // fontSize: '0px',
        }}
        src={getImage(service)} 
      />
      <Box 
        sx={{
          width: '300px',
          height: '60px',
          // bot: 3,
          position: 'relative', 
          // mt: -4.7,
          bot: 5,
          zIndex: 1, 
          bgcolor: 'rgba(255, 255, 255, 0.5)',
          // overflow: 'auto'
        }}
        
      >
        {/* <Typography variant='h5'>
          {service.Title}
        </Typography> */}
      </Box>
      
    </Paper>
  )
}
