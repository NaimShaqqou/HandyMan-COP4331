import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

import {
  Typography,
  Box,
  Button,
  createTheme,
  ThemeProvider
} from '@mui/material';

const MyMarker = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

const theme = createTheme({
  typography: {
    fontFamily: [
      // 'Comfortaa',
      'Roboto',
      '"Helvetica"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});

export default function Map(props) {

  const clickItem = (item) => async (event) => {
    props.updateFocus(item);
  };

  const defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          ...props.sx,

        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyADmpMRE8HD7JlV4vQK1V1RjzScFszfMB8' }}
          defaultCenter={props.center ? props.center : defaultProps.center}
          defaultZoom={12}
        >
          <MyMarker 
            lat={59.955413} 
            lng={30.337844} 
            text={'Kreyser Avrora'} 
          />
        </GoogleMapReact>
      </Box>
    </ThemeProvider>
  );
}