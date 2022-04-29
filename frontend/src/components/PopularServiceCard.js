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

  return (
    <Paper 
      sx={{
        opacity: 1,
        m: 3,
        width: '300px',
        height: '400px',
        borderRadius: 10,
        cursor: 'pointer',
        display: 'inline-block',
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
          height: '100px',
          // bot: 3,
          position: 'relative', 
          mt: -20,
          zIndex: 1, 
          bgcolor: 'rgba(0, 29, 73, 0.5)',
          backdropFilter: 'blur(2px)',
          // overflow: 'clip'
        }}
      />

      <Typography variant='h5' sx={{
        textAlign: 'left',
        width: '300px',
        height: '100px',
        position: 'relative', 
        mt: -12,
        ml: 1,
        zIndex: 1,
        // fontWeight: 'bold',
        color: 'white',
      }}>
        {service.Title}
      </Typography>
      
    </Paper>
  )
}
