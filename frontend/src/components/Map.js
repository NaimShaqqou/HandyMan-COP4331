import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, } from '@react-google-maps/api';

import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  Avatar,
  Typography,
  Box
} from '@mui/material';

// TODO: adjust zoom level to fit all markers

const Map = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyADmpMRE8HD7JlV4vQK1V1RjzScFszfMB8"
  })

  const containerStyle = {
    width: '100%',
    height: '850px',
  };

  const onLoad = marker => {
    // console.log('marker: ', marker)
  }

  // console.log(props.center);
  // console.log(props.results);

  return isLoaded ? (
    <Box
      sx={{
        border: 3,
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
          <Marker
            key={listitem._id}
            onLoad={onLoad}
            position={{lat: parseFloat(listitem.Latitude), lng: parseFloat(listitem.Longitude)}}
            clickable={true}
            label={listitem.Title}
            onClick={((e) => console.log(e))}
            icon={listitem._id == props.focus ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg' : ''}
          />
        ))}
      </GoogleMap>
    </Box>
  ) : <></>
}

export default React.memo(Map)