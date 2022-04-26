import React, { useState } from 'react';
import '../map.css';
import jwt_decode from "jwt-decode";
import SearchBar from "../components/SearchBar.js"
import ServiceCard from "../components/ServiceCard";
import PopularServices from "../components/PopularServices";
import { useSelector } from "react-redux";

import { motion } from 'framer-motion';

import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import {
  Box, Paper,
  Stack, Card,
  Typography,
  Container, Grid
} from "@mui/material";

const HomePage = () =>
{
  let user = useSelector((state) => state.user);

  const [msgStyle, setMsgStyle] = useState({
    textAlign: 'center',
    color: '#003c80',
    fontSize: '75px',
    mt: 0,
    opacity: 1,
    textOverflow: 'clip',
  });

  const [searchBoxStyle, setSearchBoxStyle] = useState({
    opacity: 1,
  });

  const [msgGap, setMsgGap] = useState(1.5);

  useScrollPosition(({ currPos }) => {
    const progress = -currPos.y / window.innerHeight

    const newFontSize = 75 + progress * 100;
    const newOpacity = 1 - progress * 6;

    setMsgStyle(prev => ({
      ...prev,
      fontSize: `${newFontSize}px`,
      opacity: newOpacity,
    }));

    setMsgGap(1.5 + progress * 50);

    setSearchBoxStyle(prev => ({
      ...prev,
    }));
  }, [msgStyle])

  let msg1 = 'Welcome,';
  let msg2 = 'Guest!';
  let msg3 = '';
  console.log('Rendering Homepage: ');
  // console.log(user)

  if (user.userId != '') {
    msg1 = 'Hello,';
    msg2 = user.firstName;
    msg3 = user.lastName;
  }

  const verticallyCenter = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }

  return(
    <Box>
      <Box sx={{ m: 25 }} />

      <Stack 
        spacing={7}
      >

        <motion.div 
          initial='hidden' 
          animate='visible' 
          variants={{
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
          }}
        >
          <Typography
            component={'div'}
            sx={{
              ...msgStyle,
              marginLeft: 'auto'
            }}
            noWrap
          >
            <Box
              align = "center" justify = "center" alignItems = "center"
            >
              {msg1}
              <Box m={msgGap} sx={{ display: 'inline' }}/>
              {msg2}
              {msg3 != '' && <Box m={msgGap} sx={{ display: 'inline' }}/>}
              {msg3}
            </Box>
          </Typography>
        </motion.div>

        <Box
          sx={searchBoxStyle}
        >
          <Container sx={{ width: { xs: '410px', sm: '510px', md: '940px'} }}>
            <SearchBar/>
          </Container>
        </Box>
      </Stack>

      <Box m={20}/>

      <Box>
        <Container sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
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
        </Container>

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

      <Typography variant='h4'>
        Discover Popular Services
      </Typography>

      <PopularServices />

    </Box>

  );
}

export default HomePage;