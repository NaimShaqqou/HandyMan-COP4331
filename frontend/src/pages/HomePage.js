import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import SearchBar from "../components/SearchBar.js"
import ServiceCard from "../components/ServiceCard";
import WelcomeMsg from "../components/WelcomeMsg";
import PopularServices from "../components/PopularServices";
import AnimatedBackground from "../components/AnimatedBackground";
import Barber from "../components/Barber";

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
  // const [searchBoxStyle, setSearchBoxStyle] = useState({
  //   opacity: 1,
  // });

  console.log('Rendering Homepage: ');
  // console.log(user)

  return(
    <Box
      sx={{
        overflow: 'clip',
      }}
    >
      <AnimatedBackground />

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

        <PopularServices />

        <Container>
          <Barber />
        </Container>

        <Box sx={{ }}>
          {/* <Container sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <img 
              src={require('../images/barber.jpg')} 
              style={{ 
                // marginRight: '-500px',
                height: '40%',
                width: '40%',
                objectFit: 'contain'
              }}
            />

            <Paper sx={{ width: '280px', height: '70px', ...verticallyCenter, mr: -35, mt: 70, borderRadius: 0}}>
              <Container>
                <Typography variant='h4'>
                  Handle Style
                </Typography>
              </Container>
            </Paper>
          </Container> */}

          {/* <Container sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <img src={require('../images/barber.jpg')} style={{ height: '40%', width: '40%', objectFit: 'contain'  }}/>

            <Paper sx={{ width: '280px', height: '70px', ...verticallyCenter, mr: -35, mt: 70, borderRadius: 0}}>
              <Container>
                <Typography variant='h4'>
                  Handle Style
                </Typography>
              </Container>
            </Paper>
          </Container> */}
        </Box>

        
        
      </Box>

    </Box>

  );
}

export default HomePage;