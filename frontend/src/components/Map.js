import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate, useLocation } from "react-router-dom";

import {
  Typography,
  Box,
  Button
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
    props.updateFocus(item._id);
  };

  const clickOpen = (item) => async (event) => {
    navigate("/service", { replace: true, state: { service: item } });
  };

  // console.log(props.center);
  // console.log(props.results);

  return isLoaded ? (
    <Box
      sx={{
        border: 3,
        height: '100%'
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
            {listitem._id == props.focus &&
            <InfoWindow position={{lat: parseFloat(listitem.Latitude), lng: parseFloat(listitem.Longitude)}}>
              <Box>
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
              // icon={listitem._id == props.focus ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg' : ''}
            >

            </Marker>
          </div>
        ))}
      </GoogleMap>
    </Box>
  ) : <h2>google maps not loaded</h2>
}

export default React.memo(Map)