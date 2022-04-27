import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import SearchBar from "../components/SearchBar.js"
import ServiceCard from "../components/ServiceCard";
import WelcomeMsg from "../components/WelcomeMsg";
import PopularServices from "../components/PopularServices";
import AnimatedBackground from "../components/AnimatedBackground";

import { motion, useViewportScroll  } from 'framer-motion';

import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import {
  Box, Paper,
  Stack, Card,
  Typography,
  Container, Grid
} from "@mui/material";
export default function Barber() {

  return (
    <Box
      sx={{
        display: 'flex', 
        flexDirection: 'row-reverse',
      }}
    >
      <img 
        src={require('../images/barber.jpg')} 
        style={{ 
          // marginRight: '-500px',
          height: '40%',
          width: '40%',
          objectFit: 'contain'
        }}
      />

      <Paper sx={{ 
        width: '280px', 
        height: '70px',
        mr: -35, 
        mt: 70, 
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
        }}
      >
        <Container>
          <Typography variant='h4'>
            Handle Style
          </Typography>
        </Container>
      </Paper>
    </Box>
  )
}
