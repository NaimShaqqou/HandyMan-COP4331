import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

import Marker from './Marker';
import { useNavigate, useLocation } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';

import {
  Typography,
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Paper,
  IconButton,
  Container,
  Grid,
  ClickAwayListener,
  Fade,
  Tooltip,
} from '@mui/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function MarkerInfo({service, updateFocus}) {
  let navigate = useNavigate();

  const clickOpen = (item) => (event) => {
    navigate("/service", { state: { service: item } });
  };

  const getImage = (item) => {
    if (item.Images.length > 0) return item.Images[0];
    // return breadurl;
    return require('../images/no-image-icon.png');
  };

  let imageURL = '';

  if (service.Images.length > 0)
    imageURL = service.Images[0];

  return (
    // <ClickAwayListener onClickAway={() => updateFocus(null)}>
      <motion.div
        initial='hidden' 
        animate='visible'
        exit='exit'
        variants={{
          hidden: {
            scale: .5,
            opacity: 0
          },
          visible: {
            scale: 1,
            opacity: 1,
          },
          exit: {
            scale: 0,
            opacity: 0
          }
        }}
      >
        <Paper
          sx={{
            bgcolor: '#fff',
            height: '200px',
            width: '500px',
            mt: -27,
            ml: -2,
            position: 'absolute',
            zIndex: 2,
          }}
          >
            <Grid container>
              <Grid item xs>
                <Img
                  sx={{
                    width: 200,
                    height: '203px',
                    objectFit: 'cover',
                    ml: 0
                  }}
                  src={getImage(service)} 
                />
              </Grid>
              <Grid item xs>
                <Box m sx={{ textAlign: 'center'}}>
                  <Typography variant='h5'>
                    {service.Title}
                  </Typography>
                  <Typography  variant='h5' sx={{color: 'blue'}}>
                    ${service.Price}
                  </Typography>
                  <Typography variant='subtitle1'>
                    {service.Description}
                  </Typography>
                </Box>
                {/* <Button onClick={clickOpen(service)}>Open</Button> */}

                <Box sx={{display:'flex', flexDirection:'row-reverse'}}>
                  {/* <Button onClick={clickOpen(listitem)}>Open</Button> */}
                  <Tooltip title="Go to Service">
                    <IconButton
                      onClick={clickOpen(service)}
                      sx={{
                        color: 'white',
                        bgcolor: 'steelblue',
                        "&:hover": {
                          bgcolor: "DarkTurquoise"
                        }
                      }}
                    >
                      <ArrowForwardIcon
                        // sx={{ width: 17}}
                        fontSize='large'
                        aria-label="This is aria label"
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>

              <Grid item xs>
                <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                  <IconButton onClick={() => updateFocus(null)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Grid>

            </Grid>
          {/* {service.Images} */}
        </Paper>
      </motion.div>
    // </ClickAwayListener>

  )
}
