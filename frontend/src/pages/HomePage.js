import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import SearchBar from "../components/SearchBar.js"
import ServiceCard from "../components/ServiceCard";
import WelcomeMsg from "../components/WelcomeMsg";
import PopularServices from "../components/PopularServices";
import AnimatedBackground from "../components/AnimatedBackground";
import Barber from "../components/Barber";
import RequestServiceBanner from "../components/RequestServiceBanner";
import ListServiceBanner from '../components/ListServiceBanner';

import { motion, useViewportScroll  } from 'framer-motion';

import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import {
  Box, Paper,
  Stack, Card,
  Typography,
  Container, Grid
} from "@mui/material";

const HomePage = () =>
{
  console.log('Rendering Homepage: ');
  // console.log(user)

  return(
    <Box
      sx={{
        overflow: 'clip',
      }}
    >
      <AnimatedBackground 
        height={1700}
        yDelta={300}
        startAngle={180}
        angleDelta={360}
        duration={60}
        startX='left'
        startY={0}
      />

      <Box
        sx={{
          position: 'sticky',
          mt: -215,
        }}
      >
        <Box sx={{ m: 25 }} />

        <Stack 
          spacing={7}
        >
          <WelcomeMsg />

          <Box
            // sx={searchBoxStyle}
          >
            <Container sx={{ width: { xs: '410px', sm: '510px', md: '940px'} }}>
              <SearchBar/>
            </Container>
          </Box>
        </Stack>

        <Box m={20}/>

        <Container 
          sx={{ maxWidth: { md: '1200px'} }}
        >
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <RequestServiceBanner />
            <Box sx={{ m: 10, display: 'inline' }}/>
            <ListServiceBanner />
          </Box>

          <Box m={10} />

          <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#003c80', }}>
            Discover Popular Services
          </Typography>
        </Container>

        <PopularServices />

        {/* <Container 
          sx={{ maxWidth: { md: '1500px'} }}
        >
          <Barber />
          <Barber />
        </Container>        */}
        
      </Box>

    </Box>

  );
}

export default HomePage;