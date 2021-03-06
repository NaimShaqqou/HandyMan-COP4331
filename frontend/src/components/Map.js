import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate, useLocation } from "react-router-dom";

import {
  Typography,
  Box,
  Button,
  createTheme,
  ThemeProvider
} from '@mui/material';

const Map = (props) => {
  let navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyADmpMRE8HD7JlV4vQK1V1RjzScFszfMB8"
  })

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const onLoad = marker => {
    // console.log('marker: ', marker) //
  }

  const clickItem = (item) => async (event) => {
    props.updateFocus(item);
  };

  const clickOpen = (item) => async (event) => {
    navigate("/service", { state: { service: item } });
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

  // console.log(props.center);
  // console.log(props.results); //

  return isLoaded ? (
    <ThemeProvider theme={theme}>

      <Box
        sx={{
          ...props.sx
        }}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={props.center}
          zoom={12}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          {props.results && props.results.map(listitem => (
            <div key={listitem._id}>
              {props.focus != null && listitem._id == props.focus._id &&
              <InfoWindow position={{lat: parseFloat(listitem.Latitude), lng: parseFloat(listitem.Longitude)}}>
                <Box fontFamily='Roboto'>
                  <Typography>
                    {listitem.Title}
                  </Typography>
                  <Button onClick={clickOpen(listitem)}>Open</Button>
                </Box>
              </InfoWindow>}

              <Marker
                key={listitem._id}
                onLoad={onLoad}
                position={{lat: parseFloat(listitem.Latitude), lng: parseFloat(listitem.Longitude)}}
                clickable={true}
                label={listitem.Title}
                onClick={clickItem(listitem)}
                // icon={listitem && listitem._id == props.focus._id ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg' : ''}
              >

              </Marker>
            </div>
          ))}
        </GoogleMap>
      </Box>
    </ThemeProvider>
  ) : <h2>google maps not loaded</h2>
}

export default React.memo(Map)