import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

import LocationOnIcon from '@mui/icons-material/LocationOn';

import {
  Typography,
  Box,
  Button,
  createTheme,
  ThemeProvider
} from '@mui/material';

const dummyService = {
  _id: 1,
  Title: 'servicetitle',
  Latitude: '59.95',
  Longitude: '30.4',
};

const MyMarker = ({service, focus}) => {
  return (
    <Box style={{
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'translate(-50%, -50%)',
    }}>

      {focus && (focus._id == service._id) &&
        <Box
          sx={{
            width: '50px',
            height: '50px',
            bgcolor: 'green'
          }}
        />
      }
      <LocationOnIcon 
        sx={{
          color: '#003c80',
          height: '50px',
          width: '50px',
          cursor: 'pointer',
        }}
      />
    </Box>
  )
};

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

MyMarker.defaultProps = {
  service: dummyService,
}

Map.defaultProps = {
  center: {lat: 59.95, lng: 30.33},
  zoom: 11,
  results: [
    {
      _id: 1,
      Title: 'service 1',
      Latitude: '59.95',
      Longitude: '30.4',
    },
    {
      _id: 2,
      Title: 'service 2',
      Latitude: '59.95',
      Longitude: '30.2',
    }
  ]
}

export default function Map(props) {
  const clickItem = (item) => async (event) => {
    props.updateFocus(item);
  };

  function createMapOptions(maps) {
    return {
      panControl: false,
      // mapTypeControl: true,
    }
  }

  // console.log(props.focus);

  console.log(props.center);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          ...props.sx,
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyADmpMRE8HD7JlV4vQK1V1RjzScFszfMB8' }}
          center={props.center}
          zoom={props.zoom}
          options={createMapOptions}
        >
          {props.results.map(listitem => (
            <MyMarker 
              key={listitem._id}
              lat={parseFloat(listitem.Latitude)} 
              lng={parseFloat(listitem.Longitude)} 
              service={listitem}
              focus={props.focus}
            />
          ))}
        </GoogleMapReact>
      </Box>
    </ThemeProvider>
  );
}