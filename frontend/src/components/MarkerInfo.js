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
            minHeight: '200px',
            width: '500px',
            mt: -8,
            ml: 2.5,
            position: 'absolute',
            zIndex: 2,
            p: 0,
            // borderRadius: 5
          }}
          >
            <Grid container>
              <Grid item xs={5} sx={{ height: '200px' }}>
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
              </Grid>

              <Grid item xs sx={{ pl: 2, pt: 1}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h6' sx={{ display: 'inline' }}>
                    {service.Title}
                  </Typography>
                  
                  <Typography variant='h6' sx={{ display: 'inline' }} color='#ababab'>
                    ${service.Price}
                  </Typography>
                </Box>

                <Typography color='darkblue'>
                  {service.Address}
                </Typography>
                <Typography>
                  {service.Description}
                </Typography>
              </Grid>

              <Grid item xs={1} sx={{  }}>
                <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                  <IconButton onClick={() => updateFocus(null)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box sx={{ position: 'absolute', bottom: 10, right: 10}}>
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
                        fontSize='medium'
                        aria-label="This is aria label"
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>

            </Grid>
          {/* {service.Images} */}
        </Paper>
      </motion.div>
    // </ClickAwayListener>

  )
}
