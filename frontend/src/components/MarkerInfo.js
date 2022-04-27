import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

import Marker from './Marker';
import { useNavigate, useLocation } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion, AnimatePresence } from 'framer-motion';

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
  ClickAwayListener
} from '@mui/material';

export default function MarkerInfo({service, updateFocus}) {
  let navigate = useNavigate();

  const clickOpen = (item) => (event) => {
    navigate("/service", { state: { service: item } });
  };

  let imageURL = '';

  if (service.Images.length > 0)
    imageURL = service.Images[0];

  return (
    <ClickAwayListener onClickAway={() => updateFocus(null)}>
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
            minWidth: '150px',
            mt: -27,
            ml: -2,
            position: 'absolute',
            zIndex: 2,
          }}
          >
            <Box m sx={{ textAlign: 'center'}}>
              <Typography variant='h6' sx={{ width: '100%'}}>
                {service.Title}
              </Typography>
            </Box>
          {/* {service.Images} */}
          <img src={imageURL} style={{ height: '50%', width: '50%', objectFit: 'cover'  }}/>
          <Button onClick={clickOpen(service)}>Open</Button>
        </Paper>
      </motion.div>
    </ClickAwayListener>

  )
}
