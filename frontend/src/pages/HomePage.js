import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import ResponsiveAppBar from '../components/NavBar';
import SearchBar from "../components/SearchBar.js"
import { useSelector } from "react-redux";

import { motion } from 'framer-motion';

import {
  Box, Paper,
  Stack,
  Typography,
  Container
} from "@mui/material";

const HomePage = () =>
{
  let user = useSelector((state) => state.user);
  let msg = 'Welcome, Guest!';
  console.log('Rendering Homepage: ');
  console.log(user)

  if (user.userId != '') {
    msg = 'Hello, ' + user.firstName + " " + user.lastName;
  }

  const verticallyCenter = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }

  return(
    <Box>
      {/* <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <ResponsiveAppBar />

      </Box> */}
      <Box sx={{ m: 15 }} />

      <Stack spacing={7}>

        <motion.div initial='hidden' animate='visible' variants={{
          hidden: {
            scale: .8,
            opacity: 0
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: .4
            }
          }
        }}>
          <Typography
            variant='h2'
            sx={{
              textAlign: 'center',
              color: '#003c80',
              // fontFamily: 'Comfortaa',
            }}
          >
            {msg}
          </Typography>
        </motion.div>

        <div>
          <Container sx={{ maxWidth: { xs: '380px', sm: '480px', md: '910px'} }}>
            <SearchBar/>
          </Container>
        </div>
      </Stack>

      <Box m={20}/>

      <Box>
        <Container sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <img src={require('../images/barber.jpg')} style={{ height: '40%', width: '40%', objectFit: 'contain'  }}/>

        <Paper sx={{ width: '280px', height: '70px', ...verticallyCenter, mr: -35, mt: 70, borderRadius: 0}}>
          <Container>
            <Typography variant='h4'>
              Handle Style
            </Typography>
          </Container>
        </Paper>
        </Container>
      </Box>


    </Box>

  );
}

export default HomePage;